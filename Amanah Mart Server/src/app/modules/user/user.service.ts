import { prisma } from "../../utils/prisma"
import bcrypt from 'bcrypt';
import jwt, { JwtPayload, Secret } from 'jsonwebtoken';
import { generateToken } from "../../utils/generateToken";
import config from "../../config";

const createUser = async (payload: any) => { 

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

const getAll = async ( ) => {

    const result = await prisma.user.findMany();

    return result

}

const myProfile = async (user: JwtPayload) => {

    const id = user?.id;
    const result = await prisma.user.findUniqueOrThrow({
        where: {
            id
        }
    })

    return result

}

const updateUser = async ( ) => {

    const result = await prisma 

    return result

}

const deleteUser = async ( ) => {

    const result = await prisma 

    return result

}


export const userServices = {
    createUser,
    getAll,
    myProfile,
    updateUser,
    deleteUser
}