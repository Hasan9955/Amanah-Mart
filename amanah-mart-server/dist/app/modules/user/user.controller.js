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
exports.userControllers = void 0;
const config_1 = __importDefault(require("../../config"));
const catchAsync_1 = __importDefault(require("../../utils/catchAsync"));
const pick_1 = __importDefault(require("../../utils/pick"));
const sendResponse_1 = __importDefault(require("../../utils/sendResponse"));
const user_constant_1 = require("./user.constant");
const user_service_1 = require("./user.service");
const user_validation_1 = require("./user.validation");
const getAll = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const query = req.query;
    const filterQuery = (0, pick_1.default)(query, user_constant_1.userFilterableFields);
    const options = (0, pick_1.default)(query, ['page', 'limit', 'sortBy', 'sortOrder']);
    const result = yield user_service_1.userServices.getAll(filterQuery, options);
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        message: "Users retrieved successfully!",
        data: result
    });
}));
const myProfile = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_service_1.userServices.myProfile(req.user);
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        message: "User retrieved successfully!",
        data: result
    });
}));
const createUser = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    req.body = user_validation_1.userValidation.createUserValidation.parse(JSON.parse(req.body.data));
    const result = yield user_service_1.userServices.createUser(req);
    res.cookie('refreshToken', result.refreshToken, {
        secure: config_1.default.env === 'production' ? true : false,
        httpOnly: true
    });
    (0, sendResponse_1.default)(res, {
        statusCode: 201,
        message: "User created successfully!",
        data: {
            data: result.data,
            token: result.token
        }
    });
}));
const updateUser = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (req.body.data) {
        req.body = user_validation_1.userValidation.updateUserValidation.parse(JSON.parse(req.body.data));
    }
    const result = yield user_service_1.userServices.updateUser(req);
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        message: "User updated successfully!",
        data: result
    });
}));
const deleteUser = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_service_1.userServices.deleteUser(req.params.id);
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        message: "User deleted successfully!",
        data: result
    });
}));
const softDelete = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_service_1.userServices.softDelete(req.user.id);
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        message: "User deleted successfully!",
        data: result
    });
}));
exports.userControllers = {
    createUser,
    getAll,
    myProfile,
    updateUser,
    deleteUser,
    softDelete
};
