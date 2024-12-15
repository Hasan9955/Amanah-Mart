import { prisma } from "../../utils/prisma"
import bcrypt from 'bcrypt';
import { JwtPayload, Secret } from 'jsonwebtoken';
import { generateToken } from "../../utils/generateToken";
import config from "../../config";
import { Request } from "express";
import { fileUploader } from "../../utils/fileUploder";
import AppError from "../../utils/AppError";
import httpStatus from "http-status";
import calculatePagination, { IPagination } from "../../utils/pagination";
import { Prisma } from "@prisma/client";
import { userSearchableFields } from "./user.constant";

const getAll =  async (query: any, options: IPagination) => {
    const { page, limit, skip, sortBy, sortOrder } = calculatePagination(options);

    const { searchTerm, ...filterData } = query;
    const andConditions: Prisma.UserWhereInput[] = [];

    if (query.searchTerm) {
        andConditions.push({
            OR: userSearchableFields.map(field => ({
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

    const whereCondition: Prisma.UserWhereInput = { AND: andConditions }

    // console.dir({whereCondition}, { depth: Infinity });

    const result = await prisma.user.findMany({
        where: {
            ...whereCondition, 
            isDeleted: false
        },
        skip: (Number(page) - 1) * Number(limit),
        take: Number(limit),
        orderBy: {
            [sortBy]: sortOrder
        },
        select: {
            id: true,
            email: true,
            name: true, 
            role: true,
            image: true,  
            address: true,
            phoneNumber: true,
            isDeleted: true,
            isVerified: true,
            createdAt: true,
            updatedAt: true
        }
    }) 

    const total = await prisma.user.count({
        where: {
            ...whereCondition, 
            isDeleted: false
        }
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

const myProfile = async (user: JwtPayload) => {

    const id = user?.id;
    const result = await prisma.user.findUniqueOrThrow({
        where: {
            id,
            isDeleted: false
        }
    })

    result.password = '';

    return result

}


const createUser = async (req: Request) => { 

    const file = req.file;
    const payload = req.body;

    if(file) {
        const uploadPhoto = await fileUploader.uploadToCloudinary(file)
         
        payload.image = uploadPhoto?.url 
    }
    const {password, ...userData} = payload;
    const hashedPassword = await bcrypt.hash(password, 10) 

    const result = await prisma.user.create({
        data: {
            ...userData,
            password: hashedPassword
        }
    })


    const accessToken = generateToken(
        {
            id: result.id,
            role: result.role,
            email: result.email
        },
        config.access_secret as Secret,
        config.access_exp as string
    );
    
    const refreshToken = generateToken(
        {
            id: result.id,
            role: result.role,
            email: result.email
        },
        config.refresh_secret as Secret,
        config.refresh_exp as string
    );

    return {
        data: result,
        token: accessToken,
        refreshToken
    }

}

const updateUser = async (req: Request) => {

    const id = req.params.id;
    const file = req.file;
    const payload = req.body;
    const {password, email, ...userData} = payload;

    const updateData = userData || {};
    if(file) {
        const uploadPhoto = await fileUploader.uploadToCloudinary(file)
        updateData.image = uploadPhoto?.url 
    }

    const isUserExists = await prisma.user.findUnique({
        where: {
            id,
            isDeleted: false
        }
    })

    if(!isUserExists){
        throw new AppError(httpStatus.NOT_FOUND, "User doesn't exists!")
    } 

    const result = await prisma.user.update({
        where: {
            id: isUserExists.id
        },
        data: updateData
    })

    return result

}

const deleteUser = async (id: string) => {

    await prisma.user.findUniqueOrThrow({
        where: {
            id
        }
    })

    const result = await prisma.user.delete({
        where: {
            id
        }
    })

    return null

}

const softDelete = async (id: string) => {

    await prisma.user.findUniqueOrThrow({
        where: {
            id
        }
    })

    const result = await prisma.user.update({
        where: {
            id
        },
        data: {
            isDeleted: true
        }
    })

    return null

}


export const userServices = {
    createUser,
    getAll,
    myProfile,
    updateUser,
    deleteUser,
    softDelete
}