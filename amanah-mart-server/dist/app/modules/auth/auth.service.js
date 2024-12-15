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
exports.authServices = void 0;
const config_1 = __importDefault(require("../../config"));
const generateToken_1 = require("../../utils/generateToken");
const prisma_1 = require("../../utils/prisma");
const bcrypt_1 = __importDefault(require("bcrypt"));
const sendEmail_1 = __importDefault(require("../../utils/sendEmail"));
const AppError_1 = __importDefault(require("../../utils/AppError"));
const loginUser = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const userData = yield prisma_1.prisma.user.findUniqueOrThrow({
        where: {
            email: payload.email,
            isDeleted: false
        }
    });
    const isCorrectPassword = yield bcrypt_1.default.compare(payload.password, userData.password);
    if (!isCorrectPassword) {
        throw new Error('Password does not matched!');
    }
    const accessToken = (0, generateToken_1.generateToken)({
        id: userData.id,
        role: userData.role,
        email: userData.email
    }, config_1.default.access_secret, config_1.default.access_exp);
    const refreshToken = (0, generateToken_1.generateToken)({
        id: userData.id,
        role: userData.role,
        email: userData.email
    }, config_1.default.refresh_secret, config_1.default.refresh_exp);
    userData.password = '';
    return {
        data: userData,
        token: accessToken,
        refreshToken
    };
});
const refreshToken = (token) => __awaiter(void 0, void 0, void 0, function* () {
    if (!token) {
        throw new Error("Refresh token not found!");
    }
    let decodedData;
    try {
        decodedData = (0, generateToken_1.verifyToken)(token, config_1.default.refresh_secret);
    }
    catch (error) {
        throw new Error("You are not authorized!");
    }
    const userData = yield prisma_1.prisma.user.findUniqueOrThrow({
        where: {
            email: decodedData === null || decodedData === void 0 ? void 0 : decodedData.email,
            isDeleted: false
        }
    });
    const accessToken = (0, generateToken_1.generateToken)({
        id: userData.id,
        role: userData.role,
        email: userData.email
    }, config_1.default.access_secret, config_1.default.access_exp);
    return {
        token: accessToken
    };
});
const changePassword = (user, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const userData = yield prisma_1.prisma.user.findUniqueOrThrow({
        where: {
            email: user.email,
            isDeleted: false
        }
    });
    const isCorrectPassword = yield bcrypt_1.default.compare(payload.oldPassword, userData.password);
    if (!isCorrectPassword) {
        throw new Error('Password does not matched!');
    }
    const hashedPassword = yield bcrypt_1.default.hash(payload.newPassword, 10);
    const updateUser = yield prisma_1.prisma.user.update({
        where: {
            email: userData.email,
            isDeleted: false
        },
        data: {
            password: hashedPassword
        }
    });
    updateUser.password = '';
    return updateUser;
});
const forgotPassword = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    if (!payload.email) {
        throw new Error("Email is required!");
    }
    const userData = yield prisma_1.prisma.user.findUniqueOrThrow({
        where: {
            email: payload.email,
            isDeleted: false
        }
    });
    const resetPasswordToken = (0, generateToken_1.generateToken)({
        email: userData.email, id: userData.id, role: userData.role
    }, config_1.default.reset_secret, config_1.default.reset_exp);
    const resetPassLink = config_1.default.reset_link + `?userId=${userData.id}&token=${resetPasswordToken}`;
    (0, sendEmail_1.default)(userData.email, resetPassLink);
    return resetPassLink;
});
const resetPassword = (token, payload) => __awaiter(void 0, void 0, void 0, function* () {
    if (!token) {
        throw new Error("Token not found!");
    }
    const userData = yield prisma_1.prisma.user.findUniqueOrThrow({
        where: {
            email: payload.email,
            isDeleted: false
        }
    });
    const isValidToken = (0, generateToken_1.verifyToken)(token, config_1.default.reset_secret);
    if (!isValidToken) {
        throw new AppError_1.default(403, 'Forbidden access!');
    }
    if (isValidToken.email !== userData.email) {
        throw new AppError_1.default(403, 'Forbidden access!');
    }
    const hashedPassword = yield bcrypt_1.default.hash(payload.password, 10);
    yield prisma_1.prisma.user.update({
        where: {
            email: userData.email,
            isDeleted: false
        },
        data: {
            password: hashedPassword
        }
    });
});
exports.authServices = {
    loginUser,
    refreshToken,
    changePassword,
    forgotPassword,
    resetPassword
};
