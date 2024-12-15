"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.shopRoutes = void 0;
const express_1 = require("express");
const shop_controller_1 = require("./shop.controller");
const authValidation_1 = __importDefault(require("../../middleware/authValidation"));
const client_1 = require("@prisma/client");
const fileUploder_1 = require("../../utils/fileUploder");
const router = (0, express_1.Router)();
router.get('/', shop_controller_1.shopController.getAllShop);
router.get('/:id', shop_controller_1.shopController.getSingleShop);
router.post('/', fileUploder_1.fileUploader.upload.single("file"), (0, authValidation_1.default)(client_1.UserRole.VENDOR), shop_controller_1.shopController.createShop);
router.patch('/:id', fileUploder_1.fileUploader.upload.single("file"), (0, authValidation_1.default)(client_1.UserRole.VENDOR, client_1.UserRole.VENDOR), shop_controller_1.shopController.updateShop);
router.delete('/:id', (0, authValidation_1.default)(client_1.UserRole.ADMIN), shop_controller_1.shopController.deleteShop);
exports.shopRoutes = router;
