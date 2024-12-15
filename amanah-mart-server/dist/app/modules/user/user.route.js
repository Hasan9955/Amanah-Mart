"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRoutes = void 0;
const express_1 = require("express");
const user_controller_1 = require("./user.controller");
const authValidation_1 = __importDefault(require("../../middleware/authValidation"));
const client_1 = require("@prisma/client");
const fileUploder_1 = require("../../utils/fileUploder");
const router = (0, express_1.Router)();
router.get('/', (0, authValidation_1.default)(client_1.UserRole.ADMIN), user_controller_1.userControllers.getAll);
router.get('/my-profile', (0, authValidation_1.default)(client_1.UserRole.ADMIN, client_1.UserRole.CUSTOMER, client_1.UserRole.VENDOR), user_controller_1.userControllers.myProfile);
router.post('/', fileUploder_1.fileUploader.upload.single("file"), user_controller_1.userControllers.createUser);
router.patch('/:id', fileUploder_1.fileUploader.upload.single("file"), user_controller_1.userControllers.updateUser);
router.delete('/', (0, authValidation_1.default)(client_1.UserRole.ADMIN, client_1.UserRole.CUSTOMER, client_1.UserRole.VENDOR), user_controller_1.userControllers.softDelete);
router.delete('/delete/:id', (0, authValidation_1.default)(client_1.UserRole.ADMIN), user_controller_1.userControllers.deleteUser);
exports.userRoutes = router;
