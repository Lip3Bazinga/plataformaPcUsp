"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.addReplyToReview = exports.addReview = exports.addAnswer = exports.addQuestion = exports.getCourseByUser = exports.getAllCourses = exports.getSingleCourse = exports.editCourse = exports.uploadCourse = void 0;
const catchAsyncErros_1 = require("../middleware/catchAsyncErros");
const ErrorHandlers_1 = __importDefault(require("../utils/ErrorHandlers"));
const cloudinary_1 = __importDefault(require("cloudinary"));
const course_service_1 = require("../services/course.service");
const course_model_1 = __importDefault(require("../models/course.model"));
const redis_1 = require("../utils/redis");
const mongoose_1 = __importDefault(require("mongoose"));
// Upload do curso
exports.uploadCourse = (0, catchAsyncErros_1.CatchAsyncError)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = req.body;
        const thumbnail = data.thumbnail;
        if (thumbnail) {
            const myCloud = yield cloudinary_1.default.v2.uploader.upload(thumbnail, {
                folder: "courses"
            });
            data.thumbnail = {
                public_id: myCloud.public_id,
                url: myCloud.secure_url
            };
        }
        (0, course_service_1.createCourse)(data, res, next);
    }
    catch (error) {
        return next(new ErrorHandlers_1.default(error.message, 400));
    }
}));
// Editar curso
exports.editCourse = (0, catchAsyncErros_1.CatchAsyncError)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = req.body;
        const thumbnail = data.thumbnail;
        if (thumbnail) {
            yield cloudinary_1.default.v2.uploader.destroy(thumbnail.public_id);
            const myCloud = yield cloudinary_1.default.v2.uploader.upload(thumbnail, {
                folder: "courses"
            });
            data.thumbnail = {
                public_id: myCloud.public_id,
                url: myCloud.secure_url
            };
        }
        const courseId = req.params.id;
        const course = yield course_model_1.default.findByIdAndUpdate(courseId, {
            $set: data,
        }, {
            new: true
        });
        res.status(201).json({
            success: true,
            course
        });
    }
    catch (error) {
        next(new ErrorHandlers_1.default(error.message, 500));
    }
}));
// Buscar um curso (id)
exports.getSingleCourse = (0, catchAsyncErros_1.CatchAsyncError)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const courseId = req.params.id;
        const isCacheExist = yield redis_1.redis.get(courseId);
        if (isCacheExist) {
            const course = JSON.parse(isCacheExist);
            res.status(200).json({
                success: true,
                course,
            });
        }
        else {
            const course = yield course_model_1.default.findById(req.params.id)
                .select("-courseData.videoUrl -courseData.suggestion -courseData.questions -courseData.links");
            yield redis_1.redis.set(courseId, JSON.stringify(course));
            res.status(200).json({
                success: true,
                course,
            });
        }
    }
    catch (error) {
        next(new ErrorHandlers_1.default(error.message, 500));
    }
}));
// Buscar todos os cursos
exports.getAllCourses = (0, catchAsyncErros_1.CatchAsyncError)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const isCacheExist = yield redis_1.redis.get("allCourses");
        if (isCacheExist) {
            console.log("\n\nCache encontrado:", isCacheExist);
            const course = JSON.parse(isCacheExist);
            res.status(200).json({
                success: true,
                course,
            });
        }
        else {
            const courses = yield course_model_1.default.find()
                .select("-courseData.videoUrl -courseData.questions -courseData.links");
            try {
                yield redis_1.redis.set("allCourses", JSON.stringify(courses));
                console.log("\n\nCursos armazenados no cache:", courses);
                res.status(200).json({
                    success: true,
                    courses,
                });
            }
            catch (error) {
                console.error("erro ao armazenar cursos no cache: ", error);
            }
        }
    }
    catch (error) {
        next(new ErrorHandlers_1.default(error.message, 500));
    }
}));
// Pegar conteúdo do curso
exports.getCourseByUser = (0, catchAsyncErros_1.CatchAsyncError)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const userCourseList = (_a = req.user) === null || _a === void 0 ? void 0 : _a.courses;
        const courseId = req.params.id;
        const courseExists = userCourseList === null || userCourseList === void 0 ? void 0 : userCourseList.find((course) => course._id.toString() === courseId);
        if (!courseExists)
            return next(new ErrorHandlers_1.default("Você não tem acesso a este curso.", 404));
        const course = yield course_model_1.default.findById(courseId);
        const content = course === null || course === void 0 ? void 0 : course.courseData;
        res.status(200).json({
            success: true,
            content,
        });
    }
    catch (error) {
        next(new ErrorHandlers_1.default(error.message, 500));
    }
}));
// Adicionar dúvida ao curso
exports.addQuestion = (0, catchAsyncErros_1.CatchAsyncError)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const { question, courseId, contentId } = req.body;
        const course = yield course_model_1.default.findById(courseId);
        if (!mongoose_1.default.Types.ObjectId.isValid(contentId))
            return next(new ErrorHandlers_1.default("ID do conteúdo inválido", 400));
        const courseContent = (_a = course === null || course === void 0 ? void 0 : course.courseData) === null || _a === void 0 ? void 0 : _a.find((item) => item._id.equals(contentId));
        if (!courseContent)
            return next(new ErrorHandlers_1.default("ID do conteúdo inválido.", 400));
        // Objeto de Nova pergunta
        const newQuestion = {
            user: req.user,
            question,
            questionReplies: [],
        };
        // Adicionar a pergunta ao conteúdo do curso
        courseContent.questions.push(newQuestion);
        // Salvando a alteração
        yield (course === null || course === void 0 ? void 0 : course.save());
        res.status(200).json({
            success: true,
            course
        });
    }
    catch (error) {
        next(new ErrorHandlers_1.default(error.message, 500));
    }
}));
exports.addAnswer = (0, catchAsyncErros_1.CatchAsyncError)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const { answer, courseId, contentId, questionId } = req.body;
        // Verificando se courseId é válido
        if (!mongoose_1.default.Types.ObjectId.isValid(courseId)) {
            return next(new ErrorHandlers_1.default("ID de curso inválido", 400));
        }
        const course = yield course_model_1.default.findById(new mongoose_1.default.Types.ObjectId(courseId));
        if (!course) {
            return next(new ErrorHandlers_1.default("Curso não encontrado", 404));
        }
        // Verificando se contentId é válido
        if (!mongoose_1.default.Types.ObjectId.isValid(contentId)) {
            return next(new ErrorHandlers_1.default("ID de conteúdo inválido", 400));
        }
        const courseContent = course.courseData.find((item) => item._id.equals(new mongoose_1.default.Types.ObjectId(contentId)));
        if (!courseContent) {
            return next(new ErrorHandlers_1.default("ID de conteúdo inválido", 400));
        }
        const question = (_a = courseContent === null || courseContent === void 0 ? void 0 : courseContent.questions) === null || _a === void 0 ? void 0 : _a.find((item) => item._id.equals(new mongoose_1.default.Types.ObjectId(questionId)));
        if (!question) {
            return next(new ErrorHandlers_1.default("ID da pergunta inválido", 400));
        }
        // Criando novo objeto de resposta
        const newAnswer = {
            user: req.user,
            answer,
        };
        // Adicionando a resposta à lista de respostas da pergunta
        question.questionReplies.push(newAnswer);
        yield course.save();
        res.status(200).json({
            success: true,
            message: "Resposta adicionada com sucesso",
            course,
        });
    }
    catch (error) {
        next(new ErrorHandlers_1.default(error.message, 500));
    }
}));
exports.addReview = (0, catchAsyncErros_1.CatchAsyncError)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    try {
        const userCourseList = (_a = req.user) === null || _a === void 0 ? void 0 : _a.courses;
        const courseId = req.params.id;
        const courseExists = userCourseList === null || userCourseList === void 0 ? void 0 : userCourseList.some((course) => course._id.toString() == courseId.toString());
        if (!courseExists)
            return next(new ErrorHandlers_1.default("Você não tem acesso a este curso.", 404));
        const course = yield course_model_1.default.findById(courseId);
        const { review, rating } = req.body;
        const reviewData = {
            user: req.user,
            rating,
            comment: review
        };
        course === null || course === void 0 ? void 0 : course.reviews.push(reviewData);
        let avg = 0;
        course === null || course === void 0 ? void 0 : course.reviews.forEach((rev) => {
            avg += rev.rating;
        });
        if (course)
            course.ratings = avg / (course === null || course === void 0 ? void 0 : course.reviews.length);
        yield (course === null || course === void 0 ? void 0 : course.save());
        const notification = {
            title: "Nova avaliação recebida",
            message: `${(_b = req.user) === null || _b === void 0 ? void 0 : _b.name} avaliou o curso: ${course === null || course === void 0 ? void 0 : course.name}`
        };
        // Criando notificação
        res.status(200).json({
            success: true,
            course
        });
    }
    catch (error) {
        return next(new ErrorHandlers_1.default(error.message, 500));
    }
}));
exports.addReplyToReview = (0, catchAsyncErros_1.CatchAsyncError)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    try {
        const { comment, courseId, reviewId } = req.body;
        const course = yield course_model_1.default.findById(courseId);
        if (!course)
            return next(new ErrorHandlers_1.default("Curso não encontrado", 404));
        const review = (_a = course === null || course === void 0 ? void 0 : course.reviews) === null || _a === void 0 ? void 0 : _a.find((rev) => rev._id.toString() === reviewId);
        if (!review)
            return next(new ErrorHandlers_1.default("Avaliação não encontrada.", 404));
        const replyData = {
            user: req.user,
            comment,
        };
        if (!review.commentReplies)
            review.commentReplies = [];
        (_b = review.commentReplies) === null || _b === void 0 ? void 0 : _b.push(replyData);
        yield (course === null || course === void 0 ? void 0 : course.save());
        res.status(200).json({
            success: true,
            course
        });
    }
    catch (error) {
        next(new ErrorHandlers_1.default(error.message, 500));
    }
}));
