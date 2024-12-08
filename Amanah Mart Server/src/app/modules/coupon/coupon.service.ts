import { JwtPayload } from "jsonwebtoken";
import { prisma } from "../../utils/prisma" 
import { ICoupon } from "./coupon.constant";



const getAllCoupons = async () => {
    const result = await prisma.coupon.findMany();

    return result;
}

const getAllValidCoupons = async () => {

    const today = new Date()
    const result = await prisma.coupon.findMany({
        where: {
            isActive: true,
            expiresAt: { gte: today },
            OR: [
                { usageLimit: null },  
                { usageCount: { lt: prisma.coupon.fields.usageLimit } } 
            ]
        }
    });

    return result;
}

const getMyCoupon = async (user: JwtPayload) => {

    let result = null;
    if(user.role === 'ADMIN'){
        result = await prisma.coupon.findMany({
            where: {
                createdBy: 'ADMIN'
            }
        })
    }
    else if (user.role === 'VENDOR'){
        result = await prisma.coupon.findMany({
            where: {
                createdBy: 'VENDOR',
                shop: {
                    vendorId: user.Id
                }
            }
        })
    }

    return result;


}
const getSingleCoupon = async (id: string) => {
    const result = await prisma.coupon.findFirstOrThrow({
        where: {
            id
        }
    })

    return result;
}


const createCoupon = async (payload: ICoupon) => {
    const result = await prisma.coupon.create({
        data: payload
    })
}


const updateCoupon = async (id: string, payload: Partial<ICoupon>) => {
    await prisma.coupon.findFirstOrThrow({
        where: {
            id
        }
    })

    const result = await prisma.coupon.update({
        where: {
            id
        },
        data: payload
    })
}



const deleteCoupon = async (id: string) => {
    await prisma.coupon.findFirstOrThrow({
        where: {
            id
        }
    })

    const result = await prisma.coupon.delete({
        where: {
            id
        }
    })
}

export const couponServices = {
    getAllCoupons, 
    getAllValidCoupons,
    getMyCoupon,
    getSingleCoupon,
    createCoupon,
    updateCoupon,
    deleteCoupon
}