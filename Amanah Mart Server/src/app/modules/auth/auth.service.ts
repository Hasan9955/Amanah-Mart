import { JwtPayload, Secret } from "jsonwebtoken";
import config from "../../config";
import { generateToken, verifyToken } from "../../utils/generateToken";
import { prisma } from "../../utils/prisma";
import bcrypt from 'bcrypt';
import sendEmail from "../../utils/sendEmail";
import AppError from "../../utils/AppError";



const loginUser = async (payload: {
    email: string;
    password: string;
}) => {

    const userData = await prisma.user.findUniqueOrThrow({
        where: {
            email: payload.email,
            isDeleted: false
        }
    })

    const isCorrectPassword: boolean = await bcrypt.compare(payload.password, userData.password)

    if(!isCorrectPassword){
        throw new Error('Password does not matched!')
    } 

    const accessToken = generateToken(
        {
            id: userData.id,
            role: userData.role,
            email: userData.email
        },
        config.access_secret as Secret,
        config.access_exp as string
    );
    
    const refreshToken = generateToken(
        {
            id: userData.id,
            role: userData.role,
            email: userData.email
        },
        config.refresh_secret as Secret,
        config.refresh_exp as string
    );

    userData.password = '';

    return {
        data: userData,
        token: accessToken,
        refreshToken
    }
}


const refreshToken = async (token: string) => {

    if(!token){
        throw new Error("Refresh token not found!")
    }
    let decodedData;
    try {
        decodedData = verifyToken(token, config.refresh_secret as Secret)
    } catch (error) {
        throw new Error("You are not authorized!")
    }

    const userData = await prisma.user.findUniqueOrThrow({
        where: {
            email: decodedData?.email,
            isDeleted: false
        }
    })

    const accessToken = generateToken(
        {
            id: userData.id,
            role: userData.role,
            email: userData.email
        },
        config.access_secret as Secret,
        config.access_exp as string
    );
     
    
    return {
        token: accessToken
    }

}


const changePassword = async (user: JwtPayload, payload: {
    oldPassword: string;
    newPassword: string;
}) => {
  
    const userData = await prisma.user.findUniqueOrThrow({
        where: {
            email: user.email,
            isDeleted: false
        }
    })

    const isCorrectPassword: boolean = await bcrypt.compare(payload.oldPassword, userData.password)

    if(!isCorrectPassword){
        throw new Error('Password does not matched!')
    } 

    
    const hashedPassword: string = await bcrypt.hash(payload.newPassword, 10)
    

    const updateUser = await prisma.user.update({
        where: {
            email: userData.email,
            isDeleted: false
        },
        data: {
            password: hashedPassword
        }
    })

    updateUser.password = '';

    return updateUser;

}


const forgotPassword = async (payload: {email: string}) => {

    const userData = await prisma.user.findUniqueOrThrow({
        where: {
            email: payload.email,
            isDeleted: false
        }
    })

    const resetPasswordToken = generateToken(
        {
            email: userData.email, id: userData.id, role: userData.role
        },
        config.reset_secret as string,
        config.reset_exp as string
    )

    
    const resetPassLink = config.reset_link + `?userId=${userData.id}&token=${resetPasswordToken}` 
 

    sendEmail(userData.email, resetPassLink) 
    
    return resetPassLink


}


const resetPassword = async (token: string, payload: {email: string, password: string}) => {

    const userData = await prisma.user.findUniqueOrThrow({
        where: {
            email: payload.email,
            isDeleted: false
        }
    })
    
    const isValidToken = verifyToken(token, config.reset_secret as string)
    
    if(!isValidToken) {
        throw new AppError(403, 'Forbidden access!')
    }
    
    if(isValidToken.email !== userData.email) {
        throw new AppError(403, 'Forbidden access!')
    }

    const hashedPassword: string = await bcrypt.hash(payload.password, 10) 

    await prisma.user.update({
        where: {
            email: userData.email,
            isDeleted: false
        },
        data: {
            password: hashedPassword
        }
    })

}






export const authServices = {
    loginUser,
    refreshToken,
    changePassword,
    forgotPassword,
    resetPassword
}