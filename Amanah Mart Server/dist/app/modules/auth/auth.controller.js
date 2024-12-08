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
exports.authController = void 0;
const config_1 = __importDefault(require("../../config"));
const catchAsync_1 = __importDefault(require("../../utils/catchAsync"));
const sendResponse_1 = __importDefault(require("../../utils/sendResponse"));
const auth_service_1 = require("./auth.service");
const loginUser = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield auth_service_1.authServices.loginUser(req.body);
    res.cookie('refreshToken', result.refreshToken, {
        secure: config_1.default.env === 'production' ? true : false,
        httpOnly: true
    });
    (0, sendResponse_1.default)(res, {
        statusCode: 201,
        message: "User login successfully!",
        data: {
            data: result.data,
            token: result.token
        }
    });
}));
const refreshToken = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const token = req.cookies;
    const result = yield auth_service_1.authServices.refreshToken(token.refreshToken);
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        message: 'Token generated successfully!',
        data: result
    });
}));
const changePassword = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = req.user;
    const result = yield auth_service_1.authServices.changePassword(user, req.body);
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        message: 'Password changed successfully!',
        data: result
    });
}));
const forgotPassword = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield auth_service_1.authServices.forgotPassword(req.body);
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        message: ' ',
        data: result
    });
}));
const resetPassword = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const token = req.headers.authorization || '';
    yield auth_service_1.authServices.resetPassword(token, req.body);
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        message: 'Password reset successfully',
        data: null
    });
}));
exports.authController = {
    loginUser,
    refreshToken,
    changePassword,
    forgotPassword,
    resetPassword
};
