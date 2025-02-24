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
exports.authorizeRoles = exports.isAuthenticated = void 0;
const catchAsyncErros_1 = require("./catchAsyncErros");
const ErrorHandlers_1 = __importDefault(require("../utils/ErrorHandlers"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const redis_1 = require("../utils/redis");
// Authenticated user
exports.isAuthenticated = (0, catchAsyncErros_1.CatchAsyncError)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const access_token = req.cookies.access_token;
    if (!access_token) {
        return next(new ErrorHandlers_1.default("Por favor, faça login para acessar a página", 400));
    }
    try {
        const decoded = jsonwebtoken_1.default.verify(access_token, process.env.ACCESS_TOKEN);
        if (!decoded) {
            return next(new ErrorHandlers_1.default("O Token de acesso não é válido.", 400));
        }
        const userId = decoded.id;
        const user = yield redis_1.redis.get(userId);
        if (!user)
            return next(new ErrorHandlers_1.default("Usuário não encontrado.", 400));
        req.user = JSON.parse(user);
        next();
    }
    catch (error) {
        return next(new ErrorHandlers_1.default("O Token de acesso não é válido.", 400));
    }
}));
const authorizeRoles = (...roles) => {
    return (req, res, next) => {
        var _a, _b;
        if (!roles.includes(((_a = req.user) === null || _a === void 0 ? void 0 : _a.role) || ""))
            return next(new ErrorHandlers_1.default(`Função: ${(_b = req.user) === null || _b === void 0 ? void 0 : _b.role}.Logo, o usuário não tem permissão para acessar este recurso`, 403));
        next();
    };
};
exports.authorizeRoles = authorizeRoles;
