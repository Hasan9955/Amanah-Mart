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
exports.NotificationControllers = void 0;
const catchAsync_1 = __importDefault(require("../../utils/catchAsync"));
const sendResponse_1 = __importDefault(require("../../utils/sendResponse"));
const notification_service_1 = require("./notification.service");
const getAllNotifications = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield notification_service_1.NotificationServices.getAllNotifications();
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        message: "Notifications retrieved successfully!",
        data: result
    });
}));
const getMyNotifications = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.user.id;
    const result = yield notification_service_1.NotificationServices.getMyNotifications(id);
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        message: "Notifications retrieved successfully!",
        data: result
    });
}));
const getSingleNotification = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield notification_service_1.NotificationServices.getSingleNotification(req.params.id);
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        message: "Notification retrieved successfully!",
        data: result
    });
}));
const createNotification = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield notification_service_1.NotificationServices.createNotification(req.body);
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        message: "Notification created successfully!",
        data: result
    });
}));
const updateNotification = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield notification_service_1.NotificationServices.updateNotification(req.params.id, req.body);
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        message: "Notification updated successfully!",
        data: result
    });
}));
const deleteNotification = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield notification_service_1.NotificationServices.deleteNotification(req.params.id);
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        message: "Notification deleted successfully!",
        data: result
    });
}));
exports.NotificationControllers = {
    getAllNotifications,
    getMyNotifications,
    getSingleNotification,
    createNotification,
    updateNotification,
    deleteNotification
};
