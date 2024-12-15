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
exports.shopController = void 0;
const shop_validation_1 = require("./shop.validation");
const catchAsync_1 = __importDefault(require("../../utils/catchAsync"));
const sendResponse_1 = __importDefault(require("../../utils/sendResponse"));
const shop_service_1 = require("./shop.service");
const pick_1 = __importDefault(require("../../utils/pick"));
const shop_constant_1 = require("./shop.constant");
const getAllShop = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const query = req.query;
    const filterQuery = (0, pick_1.default)(query, shop_constant_1.shopFilterableFields);
    const options = (0, pick_1.default)(query, ['page', 'limit', 'sortBy', 'sortOrder']);
    const result = yield shop_service_1.shopServices.getAllShop(filterQuery, options);
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        message: "Shops retrieved successfully!",
        data: result
    });
}));
const getSingleShop = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield shop_service_1.shopServices.getSingleShop(req.params.id);
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        message: "Shop retrieved successfully!",
        data: result
    });
}));
const createShop = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    req.body = shop_validation_1.shopValidation.createShopValidation.parse(JSON.parse(req.body.data));
    const result = yield shop_service_1.shopServices.createShop(req);
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        message: "Shop created successfully!",
        data: result
    });
}));
const updateShop = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (req.body.data) {
        req.body = shop_validation_1.shopValidation.updateShopValidation.parse(JSON.parse(req.body.data));
    }
    const result = yield shop_service_1.shopServices.updateShop(req);
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        message: "Shop updated successfully!",
        data: result
    });
}));
const deleteShop = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield shop_service_1.shopServices.deleteShop(req.params.id);
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        message: "Shop deleted successfully!",
        data: result
    });
}));
exports.shopController = {
    getAllShop,
    getSingleShop,
    updateShop,
    createShop,
    deleteShop
};
