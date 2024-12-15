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
exports.productServices = void 0;
const prisma_1 = require("../../utils/prisma");
const fileUploder_1 = require("../../utils/fileUploder");
const pagination_1 = __importDefault(require("../../utils/pagination"));
const product_contant_1 = require("./product.contant");
const getAllProducts = (query, options) => __awaiter(void 0, void 0, void 0, function* () {
    const { page, limit, skip, sortBy, sortOrder } = (0, pagination_1.default)(options);
    const { searchTerm } = query, filterData = __rest(query, ["searchTerm"]);
    const andConditions = [];
    if (query.searchTerm) {
        andConditions.push({
            OR: product_contant_1.productSearchableFields.map(field => ({
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
    const result = yield prisma_1.prisma.product.findMany({
        where: whereCondition,
        skip: (Number(page) - 1) * Number(limit),
        take: Number(limit),
        orderBy: {
            [sortBy]: sortOrder
        }
    });
    const total = yield prisma_1.prisma.product.count({
        where: whereCondition
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
const getSingleProduct = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.prisma.product.findUniqueOrThrow({
        where: {
            id
        }
    });
    return result;
});
const createProduct = (req) => __awaiter(void 0, void 0, void 0, function* () {
    const file = req.file;
    const payload = req.body;
    if (file) {
        const uploadedData = yield fileUploder_1.fileUploader.uploadToCloudinary(file);
        payload.image = uploadedData === null || uploadedData === void 0 ? void 0 : uploadedData.url;
    }
    const result = yield prisma_1.prisma.product.create({
        data: payload
    });
    return result;
});
const updateProduct = (req) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const file = req.file;
    const payload = req.body;
    const updateData = payload || {};
    const isExists = yield prisma_1.prisma.product.findUniqueOrThrow({
        where: {
            id
        }
    });
    if (file) {
        const uploadedData = yield fileUploder_1.fileUploader.uploadToCloudinary(file);
        payload.image = uploadedData === null || uploadedData === void 0 ? void 0 : uploadedData.url;
    }
    const result = yield prisma_1.prisma.product.update({
        where: {
            id: isExists.id
        },
        data: updateData
    });
    return result;
});
const deleteProduct = (id) => __awaiter(void 0, void 0, void 0, function* () {
    yield prisma_1.prisma.product.findUniqueOrThrow({
        where: {
            id
        }
    });
    const result = yield prisma_1.prisma.product.delete({
        where: {
            id
        }
    });
    return result;
});
exports.productServices = {
    getAllProducts,
    getSingleProduct,
    createProduct,
    updateProduct,
    deleteProduct
};
