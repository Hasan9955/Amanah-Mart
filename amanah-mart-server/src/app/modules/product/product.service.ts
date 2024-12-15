import { Request } from "express";
import { prisma } from "../../utils/prisma"
import { fileUploader } from "../../utils/fileUploder";
import calculatePagination, { IPagination } from "../../utils/pagination";
import { Prisma } from "@prisma/client";
import { productSearchableFields } from "./product.contant";




const getAllProducts = async (query: any, options: IPagination) => {
    const { page, limit, skip, sortBy, sortOrder } = calculatePagination(options);

    const { searchTerm, ...filterData } = query;
    const andConditions: Prisma.ProductWhereInput[] = [];

    if (query.searchTerm) {
        andConditions.push({
            OR: productSearchableFields.map(field => ({
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

    const whereCondition: Prisma.ProductWhereInput = { AND: andConditions }

    // console.dir({whereCondition}, { depth: Infinity });

    const result = await prisma.product.findMany({
        where: whereCondition,
        skip: (Number(page) - 1) * Number(limit),
        take: Number(limit),
        orderBy: {
            [sortBy]: sortOrder
        }
    }) 

    const total = await prisma.product.count({
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

const getSingleProduct = async (id: string) => {
    const result = await prisma.product.findUniqueOrThrow({
        where: {
            id
        }
    })

    return result;
}

const createProduct = async (req: Request) => {
    const file = req.file;
    const payload = req.body;

    if(file) {
        const uploadedData = await fileUploader.uploadToCloudinary(file)
        payload.image = uploadedData?.url;
    }
    const result = await prisma.product.create({
        data: payload
    })

    return result;
}

const updateProduct = async (req: Request) => {
    const id = req.params.id;
    const file = req.file;
    const payload = req.body;
    const updateData = payload || {};

    const isExists = await prisma.product.findUniqueOrThrow({
        where: {
            id
        }
    })

    if(file) {
        const uploadedData = await fileUploader.uploadToCloudinary(file)
        payload.image = uploadedData?.url;
    }

    const result = await prisma.product.update({
        where: {
            id: isExists.id
        },
        data: updateData
    })

    return result;
}

const deleteProduct = async (id: string) => {

    await prisma.product.findUniqueOrThrow({
        where: {
            id
        }
    })

    const result = await prisma.product.delete({
        where: {
            id
        }
    })

    return result;
}


export const productServices = {
    getAllProducts,
    getSingleProduct,
    createProduct,
    updateProduct,
    deleteProduct
}