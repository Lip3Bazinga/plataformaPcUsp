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
exports.updateProfilePicture = exports.updatePassword = exports.updateUserInfo = exports.socialAuth = exports.getUserInfo = exports.updateAccessToken = exports.logoutUser = exports.loginUser = exports.activateUser = exports.createActivationToken = exports.registrationUser = void 0;
require("dotenv/config");
const user_model_1 = __importDefault(require("../models/user.model"));
const ErrorHandlers_1 = __importDefault(require("../utils/ErrorHandlers"));
const catchAsyncErros_1 = require("../middleware/catchAsyncErros");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const ejs_1 = __importDefault(require("ejs"));
const path_1 = __importDefault(require("path"));
const sendMail_1 = __importDefault(require("../utils/sendMail"));
const jwt_1 = require("../utils/jwt");
const redis_1 = require("../utils/redis");
const user_service_1 = require("../services/user.service");
const cloudinary_1 = __importDefault(require("cloudinary"));
exports.registrationUser = (0, catchAsyncErros_1.CatchAsyncError)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, email, emailPersonCharge, age, telephone, telephonePersonCharge, seriesCurrentlyStudying, password } = req.body;
        console.log(req.body);
        const isEmailExist = yield user_model_1.default.findOne({ email });
        if (isEmailExist) {
            return next(new ErrorHandlers_1.default("Email já cadastrado!", 400));
        }
        const user = {
            name,
            email,
            emailPersonCharge,
            age,
            telephone,
            telephonePersonCharge,
            seriesCurrentlyStudying,
            password,
        };
        const activationToken = (0, exports.createActivationToken)(user);
        const activationCode = activationToken.activationCode;
        const data = {
            user: {
                name: user.name
            },
            activationCode
        };
        const html = yield ejs_1.default.renderFile(path_1.default.join(__dirname, "../mails/activationMail.ejs"), data);
        try {
            yield (0, sendMail_1.default)({
                email: user.email,
                subject: "Ative a sua conta",
                template: "activationMail.ejs",
                data
            });
            res.status(200).json({
                success: true,
                message: `Por favor, verifique o seu email: ${user.email} para ativar a sua conta!`,
                activationToken: activationToken.token
            });
        }
        catch (error) {
            return next(new ErrorHandlers_1.default(error.message, 400));
        }
    }
    catch (error) {
        return next(new ErrorHandlers_1.default(error.message, 400));
    }
}));
const createActivationToken = (user) => {
    const activationCode = Math.floor(1000 + Math.random() * 9000).toString();
    const token = jsonwebtoken_1.default.sign({
        user,
        activationCode
    }, process.env.ACTIVATION_SECRET, {
        expiresIn: "5m"
    });
    return { token, activationCode };
};
exports.createActivationToken = createActivationToken;
exports.activateUser = (0, catchAsyncErros_1.CatchAsyncError)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { activation_token, activation_code } = req.body;
        const newUser = jsonwebtoken_1.default.verify(activation_token, process.env.ACTIVATION_SECRET);
        if (newUser.activationCode !== activation_code)
            return next(new ErrorHandlers_1.default("Código de ativação inválido", 400));
        const { name, email, emailPersonCharge, age, telephone, telephonePersonCharge, seriesCurrentlyStudying, password, } = newUser.user;
        const existUser = yield user_model_1.default.findOne({ email });
        if (existUser)
            return next(new ErrorHandlers_1.default("Email já cadastrado", 400));
        const user = yield user_model_1.default.create({
            name,
            email,
            emailPersonCharge,
            age,
            telephone,
            telephonePersonCharge,
            seriesCurrentlyStudying,
            password
        });
        res.status(201).json({
            success: true
        });
    }
    catch (error) {
        return next(new ErrorHandlers_1.default(error.message, 400));
    }
}));
exports.loginUser = (0, catchAsyncErros_1.CatchAsyncError)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        // Verifique se email e password foram fornecidos
        if (!email || !password) {
            return next(new ErrorHandlers_1.default("Por favor entre com o email e senha", 400));
        }
        // Busque o usuário pelo email
        const user = yield user_model_1.default.findOne({ email }).select("+password");
        // Verifique se o usuário existe
        if (!user) {
            return next(new ErrorHandlers_1.default("Email ou senha inválidos.", 400));
        }
        // Verifique se a senha está correta
        const isPasswordMatch = yield user.comparePassword(password);
        if (!isPasswordMatch) {
            return next(new ErrorHandlers_1.default("Email ou senha inválidos.", 400));
        }
        // Se tudo estiver correto, envie o token
        (0, jwt_1.sendToken)(user, 200, res);
    }
    catch (error) {
        console.log("Erro na função sendToken: ", error);
        return next(new ErrorHandlers_1.default(error.message, 400));
    }
}));
// Logout User
exports.logoutUser = (0, catchAsyncErros_1.CatchAsyncError)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const userId = ((_a = req.user) === null || _a === void 0 ? void 0 : _a._id) || "";
        res.cookie("access_token", "", { maxAge: 1 });
        res.cookie("refresh_token", "", { maxAge: 1 });
        console.log(req.user);
        redis_1.redis.del(userId);
        res.status(200).json({
            success: true,
            message: "Deslogado com sucesso."
        });
    }
    catch (error) {
        return next(new ErrorHandlers_1.default(error.message, 400));
    }
}));
// Update access token
exports.updateAccessToken = (0, catchAsyncErros_1.CatchAsyncError)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const refresh_token = req.cookies.refresh_token || "";
        const decoded = jsonwebtoken_1.default.verify(refresh_token, process.env.REFRESH_TOKEN);
        const message = "Não foi possível atualizar o token";
        if (!decoded)
            return next(new ErrorHandlers_1.default(message, 400));
        const session = yield redis_1.redis.get(decoded.id);
        if (!session)
            return next(new ErrorHandlers_1.default(message, 400));
        const user = JSON.parse(session);
        const accessToken = jsonwebtoken_1.default.sign({ id: user._id }, process.env.ACCESS_TOKEN, {
            expiresIn: "5m",
        });
        const refreshToken = jsonwebtoken_1.default.sign({
            id: user._id
        }, process.env.REFRESH_TOKEN, {
            expiresIn: "3d"
        });
        req.user = user;
        res.cookie("access_token", accessToken, jwt_1.accessTokenOptions);
        res.cookie("refresh_token", refreshToken, jwt_1.refreshTokenOptions);
        res.status(200).json({
            status: "success",
            accessToken,
        });
    }
    catch (error) {
        return next(new ErrorHandlers_1.default(error.message, 400));
    }
}));
// Get user info
exports.getUserInfo = (0, catchAsyncErros_1.CatchAsyncError)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a._id;
        // Verifique se o userId existe
        if (!userId) {
            return next(new ErrorHandlers_1.default("Usuário não encontrado", 400));
        }
        (0, user_service_1.getUserById)(userId, res);
    }
    catch (error) {
        return next(new ErrorHandlers_1.default(error.message, 400));
    }
}));
// Social auth
exports.socialAuth = (0, catchAsyncErros_1.CatchAsyncError)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("Requisição recebida para social auth.");
    try {
        const { email, name, avatar } = req.body;
        const user = yield user_model_1.default.findOne({ email });
        if (!user) {
            const newUser = yield user_model_1.default.create({ email, name, avatar });
            (0, jwt_1.sendToken)(newUser, 200, res);
        }
        else
            (0, jwt_1.sendToken)(user, 200, res);
    }
    catch (error) {
        next(new ErrorHandlers_1.default(error.message, 400));
    }
}));
// Update User info
exports.updateUserInfo = (0, catchAsyncErros_1.CatchAsyncError)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    try {
        const { age } = req.body;
        if (age < 18) {
            const { name, email, emailPersonCharge, telephone, telephonePersonCharge } = req.body;
            const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a._id;
            if (!userId)
                return next(new ErrorHandlers_1.default("Usuário não encontrado.", 400));
            const user = yield user_model_1.default.findById(userId);
            if (!user)
                return next(new ErrorHandlers_1.default("Usuário não encontrado.", 400));
            if (email && user) {
                const isEmailExist = yield user_model_1.default.findOne({ email });
                if (isEmailExist)
                    return next(new ErrorHandlers_1.default("Email já existente.", 400));
                user.email = email;
            }
            if (emailPersonCharge && user) {
                const isEmailExist = yield user_model_1.default.findOne({ emailPersonCharge });
                if (isEmailExist)
                    return next(new ErrorHandlers_1.default("Email já existente.", 400));
                user.emailPersonCharge = emailPersonCharge;
            }
            if (name && user)
                user.name = name;
            if (telephone && user)
                user.telephone = telephone;
            yield (user === null || user === void 0 ? void 0 : user.save());
            yield redis_1.redis.set(userId.toString(), JSON.stringify(user));
            res.status(201).json({
                success: true,
                message: "Informações do usuário atualizadas com sucesso.",
                user
            });
        }
        const { name, email } = req.body;
        const userId = (_b = req.user) === null || _b === void 0 ? void 0 : _b._id;
        if (!userId)
            return next(new ErrorHandlers_1.default("Usuário não encontrado.", 400));
        const user = yield user_model_1.default.findById(userId);
        if (!user)
            return next(new ErrorHandlers_1.default("Usuário não encontrado.", 400));
        if (email && user) {
            const isEmailExist = yield user_model_1.default.findOne({ email });
            if (isEmailExist)
                return next(new ErrorHandlers_1.default("Email já existente.", 400));
            user.email = email;
        }
        if (name && user) {
            user.name = name;
        }
        yield (user === null || user === void 0 ? void 0 : user.save());
        yield redis_1.redis.set(userId.toString(), JSON.stringify(user));
        res.status(201).json({
            success: true,
            message: "Informações do usuário atualizadas com sucesso.",
            user
        });
    }
    catch (error) {
        return next(new ErrorHandlers_1.default(error.message, 400));
    }
}));
// Update User password
exports.updatePassword = (0, catchAsyncErros_1.CatchAsyncError)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    try {
        const { oldPassword, newPassword } = req.body;
        if (!oldPassword || !newPassword) {
            return next(new ErrorHandlers_1.default("Por favor informe a senha antiga e a nova senha.", 400));
        }
        const user = yield user_model_1.default.findById((_a = req.user) === null || _a === void 0 ? void 0 : _a._id).select("+password");
        if (!user)
            return next(new ErrorHandlers_1.default("Usuário inválido", 400));
        const isPasswordMatch = yield user.comparePassword(oldPassword);
        if (!isPasswordMatch)
            return next(new ErrorHandlers_1.default("Senha antiga inválida", 400));
        user.password = newPassword;
        yield user.save();
        // Verifique se o userId existe antes de usar no Redis
        const userId = (_b = req.user) === null || _b === void 0 ? void 0 : _b._id;
        if (!userId) {
            return next(new ErrorHandlers_1.default("Usuário não encontrado", 404));
        }
        yield redis_1.redis.set(userId.toString(), JSON.stringify(user));
        res.status(201).json({
            success: true,
            message: "Senha alterada com sucesso.",
            user,
        });
    }
    catch (error) {
        return next(new ErrorHandlers_1.default(error.message, 400));
    }
}));
// Update profile picture
exports.updateProfilePicture = (0, catchAsyncErros_1.CatchAsyncError)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c;
    try {
        const { avatar } = req.body;
        const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a._id;
        if (!userId)
            return next(new ErrorHandlers_1.default("Usuário não encontrado", 404));
        const user = yield user_model_1.default.findById(userId);
        if (!user)
            return next(new ErrorHandlers_1.default("Usuário não encontrado", 404));
        if (avatar) {
            if ((_b = user.avatar) === null || _b === void 0 ? void 0 : _b.public_id)
                yield cloudinary_1.default.v2.uploader.destroy((_c = user === null || user === void 0 ? void 0 : user.avatar) === null || _c === void 0 ? void 0 : _c.public_id);
            const myCloud = yield cloudinary_1.default.v2.uploader.upload(avatar, {
                folder: "avatars",
                width: 150
            });
            user.avatar = {
                public_id: myCloud.public_id,
                url: myCloud.secure_url
            };
        }
        yield user.save();
        yield redis_1.redis.set(userId.toString(), JSON.stringify(user));
        res.status(200).json({
            success: true,
            user,
        });
    }
    catch (error) {
        return next(new ErrorHandlers_1.default(error.message || "Erro ao atualizar a imagem de perfil.", 400));
    }
}));
