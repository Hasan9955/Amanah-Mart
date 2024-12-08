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
exports.productControllers = void 0;
const catchAsync_1 = __importDefault(require("../../utils/catchAsync"));
const pick_1 = __importDefault(require("../../utils/pick"));
const sendResponse_1 = __importDefault(require("../../utils/sendResponse"));
const product_contant_1 = require("./product.contant");
const product_service_1 = require("./product.service");
const product_validation_1 = require("./product.validation");
const getAllProduct = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const query = req.query;
    const filterQuery = (0, pick_1.default)(query, product_contant_1.productFilterableFields);
    const options = (0, pick_1.default)(query, ['page', 'limit', 'sortBy', 'sortOrder']);
    const result = yield product_service_1.productServices.getAllProducts(filterQuery, options);
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        message: "Products retrieved successfully!",
        data: result
    });
}));
const getSingleProduct = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield product_service_1.productServices.getSingleProduct(req.params.id);
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        message: "Product retrieved successfully!",
        data: result
    });
}));
const createProduct = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    req.body = product_validation_1.createProductValidation.parse(JSON.parse(req.body.data));
    const result = yield product_service_1.productServices.createProduct(req);
    (0, sendResponse_1.default)(res, {
        statusCode: 201,
        message: "Product created successfully!",
        data: result
    });
}));
const updateProduct = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (req.body.data) {
        req.body = product_validation_1.createProductValidation.parse(JSON.parse(req.body.data));
    }
    const result = yield product_service_1.productServices.updateProduct(req);
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        message: "Product updated successfully!",
        data: result
    });
}));
const deleteProduct = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield product_service_1.productServices.deleteProduct(req.params.id);
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        message: "Product deleted successfully!",
        data: result
    });
}));
exports.productControllers = {
    getAllProduct,
    getSingleProduct,
    createProduct,
    updateProduct,
    deleteProduct
};
