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
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotificationServices = void 0;
const prisma_1 = require("../../utils/prisma");
const getAllNotifications = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.prisma.notification.findMany();
    return result;
});
const getSingleNotification = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.prisma.notification.findFirstOrThrow({
        where: {
            id
        }
    });
    return result;
});
const getMyNotifications = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.prisma.notification.findMany({
        where: {
            userId: id
        }
    });
    return result;
});
const createNotification = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.prisma.notification.create({
        data: payload
    });
});
const updateNotification = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    yield prisma_1.prisma.notification.findFirstOrThrow({
        where: {
            id
        }
    });
    const result = yield prisma_1.prisma.notification.update({
        where: {
            id
        },
        data: payload
    });
});
const deleteNotification = (id) => __awaiter(void 0, void 0, void 0, function* () {
    yield prisma_1.prisma.notification.findFirstOrThrow({
        where: {
            id
        }
    });
    const result = yield prisma_1.prisma.notification.delete({
        where: {
            id
        }
    });
});
exports.NotificationServices = {
    getAllNotifications,
    getSingleNotification,
    getMyNotifications,
    createNotification,
    updateNotification,
    deleteNotification
};
