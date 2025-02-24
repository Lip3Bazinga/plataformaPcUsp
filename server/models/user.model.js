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
require("dotenv/config");
const mongoose_1 = __importDefault(require("mongoose"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const emailRegexPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const userSchema = new mongoose_1.default.Schema({
    name: {
        type: String,
        required: [true, "Digite seu nome..."]
    },
    age: {
        type: Number,
        required: [true, "Digite sua idade..."]
    },
    email: {
        type: String,
        required: [true, "Digite seu email..."],
        validate: {
            validator: function (value) {
                return emailRegexPattern.test(value);
            },
            message: "Por favor entre com um email válido."
        },
        unique: true
    },
    emailPersonCharge: {
        type: String,
        required: [false, "Digite o email do responsável..."]
    },
    password: {
        type: String,
        minlength: [6, "A senha deve ter pelo menos 6 caracteres"],
        select: false
    },
    telephone: {
        type: String,
        required: [true, "Digite seu telefone..."]
    },
    telephonePersonCharge: {
        type: String,
        required: [false, "Digite o telefone do responsável..."]
    },
    seriesCurrentlyStudying: {
        type: String,
        required: [true, "Digite a série que está estudando..."]
    },
    avatar: {
        public_id: String,
        url: String
    },
    role: {
        type: String,
        default: "Usuário"
    },
    isVerified: {
        type: Boolean,
        default: false
    },
    courses: [
        {
            type: mongoose_1.default.Schema.Types.ObjectId,
            ref: "Course"
        }
    ]
}, {
    timestamps: true
});
// Hash Password before saving
userSchema.pre("save", function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!this.isModified("password"))
            return next();
        this.password = yield bcryptjs_1.default.hash(this.password, 10);
        next();
    });
});
// Sign access token
userSchema.methods.SignAccessToken = function () {
    return jsonwebtoken_1.default.sign({
        id: this._id
    }, process.env.ACCESS_TOKEN || "", {
        expiresIn: "5m"
    });
};
// Sign refresh token
userSchema.methods.SignRefreshToken = function () {
    return jsonwebtoken_1.default.sign({
        id: this._id
    }, process.env.REFRESH_TOKEN || "", {
        expiresIn: "3d"
    });
};
// Compare password
userSchema.methods.comparePassword = function (enteredPassword) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield bcryptjs_1.default.compare(enteredPassword, this.password);
    });
};
const userModel = mongoose_1.default.model("User", userSchema);
exports.default = userModel;
