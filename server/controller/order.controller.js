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
exports.createOrder = void 0;
const catchAsyncErros_1 = require("../middleware/catchAsyncErros");
const ErrorHandlers_1 = __importDefault(require("../utils/ErrorHandlers"));
const user_model_1 = __importDefault(require("../models/user.model"));
const course_model_1 = __importDefault(require("../models/course.model"));
const notificationModel_1 = __importDefault(require("../models/notificationModel"));
const path_1 = __importDefault(require("path"));
const ejs_1 = __importDefault(require("ejs"));
const sendMail_1 = __importDefault(require("../utils/sendMail"));
const order_service_1 = require("../services/order.service");
// Criando pedido
exports.createOrder = (0, catchAsyncErros_1.CatchAsyncError)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const { courseId } = req.body;
        const user = yield user_model_1.default.findById((_a = req.user) === null || _a === void 0 ? void 0 : _a._id);
        const courseExistsInUser = user === null || user === void 0 ? void 0 : user.courses.some((course) => course._id.toString() === courseId);
        if (courseExistsInUser)
            return next(new ErrorHandlers_1.default("Você já adquiriu este curso.", 400));
        const course = yield course_model_1.default.findById(courseId);
        if (!course)
            return next(new ErrorHandlers_1.default("Curso não encontrado", 400));
        if (!user || !user._id)
            return next(new ErrorHandlers_1.default("Usuário não encontrado ou ID do usuário não disponível", 404));
        const data = {
            courseId: course._id,
            userId: user === null || user === void 0 ? void 0 : user._id
        };
        const mailData = {
            order: {
                _id: course._id.toString().slice(0, 6),
                name: course.name,
                date: new Date().toLocaleDateString("pt-BR", {
                    day: "numeric",
                    month: "long",
                    year: "numeric"
                })
            }
        };
        const html = yield ejs_1.default.renderFile(path_1.default.join(__dirname, "../mails/orderConfirmation.ejs"), {
            order: mailData
        });
        try {
            if (user) {
                yield (0, sendMail_1.default)({
                    email: user.email,
                    subject: "Pedido confirmado",
                    template: "orderConfirmation.ejs",
                    data: mailData,
                });
            }
        }
        catch (error) {
            next(new ErrorHandlers_1.default(error.message, 500));
        }
        user === null || user === void 0 ? void 0 : user.courses.push(course === null || course === void 0 ? void 0 : course._id);
        yield (user === null || user === void 0 ? void 0 : user.save());
        yield notificationModel_1.default.create({
            user: user === null || user === void 0 ? void 0 : user._id,
            title: "Novo pedido",
            message: `Você tem um novo pedido de: ${course === null || course === void 0 ? void 0 : course.name}`
        });
        (0, order_service_1.newOrder)(data, res, next);
    }
    catch (error) {
        next(new ErrorHandlers_1.default(error.message, 500));
    }
}));
