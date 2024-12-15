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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userServices = void 0;
const prisma_1 = require("../../utils/prisma");
const bcrypt_1 = __importDefault(require("bcrypt"));
const generateToken_1 = require("../../utils/generateToken");
const config_1 = __importDefault(require("../../config"));
const fileUploder_1 = require("../../utils/fileUploder");
const AppError_1 = __importDefault(require("../../utils/AppError"));
const http_status_1 = __importDefault(require("http-status"));
const pagination_1 = __importDefault(require("../../utils/pagination"));
const user_constant_1 = require("./user.constant");
const getAll = (query, options) => __awaiter(void 0, void 0, void 0, function* () {
    const { page, limit, skip, sortBy, sortOrder } = (0, pagination_1.default)(options);
    const { searchTerm } = query, filterData = __rest(query, ["searchTerm"]);
    const andConditions = [];
    if (query.searchTerm) {
        andConditions.push({
            OR: user_constant_1.userSearchableFields.map(field => ({
                [field]: {
                    contains: query.searchTerm,
                    mode: 'insensitive'
                }
            }))
        });
    }
    if (Object.keys(filterData).length > 0) {
        andConditions.push({
            AND: Object.keys(filterData).map(key => ({
                [key]: {
                    equals: filterData[key]
                }
            }))
        });
    }
    // console.dir({andConditions}, { depth: Infinity });
    const whereCondition = { AND: andConditions };
    // console.dir({whereCondition}, { depth: Infinity });
    const result = yield prisma_1.prisma.user.findMany({
        where: Object.assign(Object.assign({}, whereCondition), { isDeleted: false }),
        skip: (Number(page) - 1) * Number(limit),
        take: Number(limit),
        orderBy: {
            [sortBy]: sortOrder
        },
        select: {
            id: true,
            email: true,
            name: true,
            role: true,
            image: true,
            address: true,
            phoneNumber: true,
            isDeleted: true,
            isVerified: true,
            createdAt: true,
            updatedAt: true
        }
    });
    const total = yield prisma_1.prisma.user.count({
        where: Object.assign(Object.assign({}, whereCondition), { isDeleted: false })
    });
    return {
        meta: {
            page,
            limit,
            total,
            skip
        },
        data: {
            result
        }
    };
});
const myProfile = (user) => __awaiter(void 0, void 0, void 0, function* () {
    const id = user === null || user === void 0 ? void 0 : user.id;
    const result = yield prisma_1.prisma.user.findUniqueOrThrow({
        where: {
            id,
            isDeleted: false
        }
    });
    result.password = '';
    return result;
});
const createUser = (req) => __awaiter(void 0, void 0, void 0, function* () {
    const file = req.file;
    const payload = req.body;
    if (file) {
        const uploadPhoto = yield fileUploder_1.fileUploader.uploadToCloudinary(file);
        payload.image = uploadPhoto === null || uploadPhoto === void 0 ? void 0 : uploadPhoto.url;
    }
    const { password } = payload, userData = __rest(payload, ["password"]);
    const hashedPassword = yield bcrypt_1.default.hash(password, 10);
    const result = yield prisma_1.prisma.user.create({
        data: Object.assign(Object.assign({}, userData), { password: hashedPassword })
    });
    const accessToken = (0, generateToken_1.generateToken)({
        id: result.id,
        role: result.role,
        email: result.email
    }, config_1.default.access_secret, config_1.default.access_exp);
    const refreshToken = (0, generateToken_1.generateToken)({
        id: result.id,
        role: result.role,
        email: result.email
    }, config_1.default.refresh_secret, config_1.default.refresh_exp);
    return {
        data: result,
        token: accessToken,
        refreshToken
    };
});
const updateUser = (req) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const file = req.file;
    const payload = req.body;
    const { password, email } = payload, userData = __rest(payload, ["password", "email"]);
    const updateData = userData || {};
    if (file) {
        const uploadPhoto = yield fileUploder_1.fileUploader.uploadToCloudinary(file);
        updateData.image = uploadPhoto === null || uploadPhoto === void 0 ? void 0 : uploadPhoto.url;
    }
    const isUserExists = yield prisma_1.prisma.user.findUnique({
        where: {
            id,
            isDeleted: false
        }
    });
    if (!isUserExists) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, "User doesn't exists!");
    }
    const result = yield prisma_1.prisma.user.update({
        where: {
            id: isUserExists.id
        },
        data: updateData
    });
    return result;
});
const deleteUser = (id) => __awaiter(void 0, void 0, void 0, function* () {
    yield prisma_1.prisma.user.findUniqueOrThrow({
        where: {
            id
        }
    });
    const result = yield prisma_1.prisma.user.delete({
        where: {
            id
        }
    });
    return null;
});
const softDelete = (id) => __awaiter(void 0, void 0, void 0, function* () {
    yield prisma_1.prisma.user.findUniqueOrThrow({
        where: {
            id
        }
    });
    const result = yield prisma_1.prisma.user.update({
        where: {
            id
        },
        data: {
            isDeleted: true
        }
    });
    return null;
});
exports.userServices = {
    createUser,
    getAll,
    myProfile,
    updateUser,
    deleteUser,
    softDelete
};
