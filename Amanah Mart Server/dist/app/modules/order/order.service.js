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
const prisma_1 = require("../../utils/prisma");
const getAllOrder = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.prisma.order.findMany();
    return result;
});
const getSingleOrder = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.prisma.order.findUniqueOrThrow({
        where: {
            id
        },
        include: {
            items: {
                include: {
                    product: true
                }
            }
        }
    });
    return result;
});
const getMyOrder = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.prisma.order.findMany({
        where: {
            customerId: id
        }
    });
    return result;
});
const getVendorOrder = (vendorId) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.prisma.orderItem.findMany({
        where: {
            product: {
                shop: {
                    vendorId: {
                        equals: vendorId
                    }
                }
            }
        },
        include: {
            product: true
        }
    });
    return result;
});
const createOrder = (orderData) => __awaiter(void 0, void 0, void 0, function* () {
    const { customerId, shopId, totalAmount, couponId, status, items } = orderData;
    const result = yield prisma_1.prisma.$transaction((prismaTran) => __awaiter(void 0, void 0, void 0, function* () {
        const order = yield prismaTran.order.create({
            data: {
                customerId,
                shopId,
                totalAmount,
                couponId: couponId || null,
                status,
            },
        });
        const orderItems = items.map((item) => ({
            orderId: order.id,
            productId: item.productId,
            quantity: item.quantity,
            price: item.price,
            totalPrice: item.totalPrice,
        }));
        yield prismaTran.orderItem.createMany({
            data: orderItems,
        });
        return order;
    }));
    return result;
});
const updateOrder = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    yield prisma_1.prisma.order.findUniqueOrThrow({
        where: {
            id
        }
    });
});
