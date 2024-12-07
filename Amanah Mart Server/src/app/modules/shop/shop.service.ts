import { Request } from "express";
import { prisma } from "../../utils/prisma"
import { fileUploader } from "../../utils/fileUploder";
import calculatePagination, { IPagination } from "../../utils/pagination";
import { Prisma } from "@prisma/client";
import { shopSearchableFields } from "./shop.constant";



const getAllShop = async (query: any, options: IPagination) => {
    const { page, limit, skip, sortBy, sortOrder } = calculatePagination(options);

    const { searchTerm, ...filterData } = query;
    const andConditions: Prisma.ShopWhereInput[] = [];

    if (query.searchTerm) {
        andConditions.push({
            OR: shopSearchableFields.map(field => ({
                [field]: {
                    contains: query.searchTerm,
                    mode: 'insensitive'
                }
            }))
        })
    }

    if (Object.keys(filterData).length > 0) {
        andConditions.push({
            AND: Object.keys(filterData).map(key => ({
                [key]: {
                    equals: filterData[key]
                }
            }))
        })
    }

    // console.dir({andConditions}, { depth: Infinity });

    const whereCondition: Prisma.ShopWhereInput = { AND: andConditions }

    // console.dir({whereCondition}, { depth: Infinity });

    const result = await prisma.shop.findMany({
        where: whereCondition,
        skip: (Number(page) - 1) * Number(limit),
        take: Number(limit),
        orderBy: {
            [sortBy]: sortOrder
        }
    }) 

    const total = await prisma.shop.count({
        where: whereCondition
    })

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

}

const getSingleShop = async (id: string) => {
    const result = await prisma.shop.findUniqueOrThrow({
        where: {
            id
        }
    })

    return result;
}


const createShop = async (req: Request) => {
    const file = req.file;
    const payload = req.body;

    if (file) {
        const uploadedData = await fileUploader.uploadToCloudinary(file)
        payload.logo = uploadedData?.url
    }

    const result = await prisma.shop.create({
        data: payload
    })

    return result;
}


const updateShop = async (req: Request) => {

    const id = req.params.id;
    const payload = req.body;
    const file = req.file;
    const updateData = payload || {}

    if (file) {
        const uploadedData = await fileUploader.uploadToCloudinary(file)
        updateData.logo = uploadedData?.url
    }

    const isExists = await prisma.shop.findUniqueOrThrow({
        where: {
            id
        }
    })

    const result = await prisma.shop.update({
        where: {
            id
        },
        data: payload
    })

    return result;
}


const deleteShop = async (id: string) => {
    const result = await prisma.shop.delete({
        where: {
            id
        }
    })

    return result;
}

export const shopServices = {
    getAllShop,
    getSingleShop,
    createShop,
    updateShop,
    deleteShop
}
