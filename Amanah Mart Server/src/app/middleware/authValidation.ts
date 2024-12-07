import { NextFunction, Request, Response } from "express" 
import AppError from "../utils/AppError";
import config from "../config";
import { verifyToken } from "../utils/generateToken";



const authValidation = (...roles: string[]) => {

    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            const token = req.headers.authorization

            if (!token) {
                throw new AppError(401, "You are not authorized")
            }

            const verifiedUser = verifyToken(token, config.access_secret as string)
            
            req.user = verifiedUser;

            if (roles.length && !roles.includes(verifiedUser.role)) {
                throw new AppError(401, "You are not authorized")
            }

            next();

        } catch (error) {
            next(error)
        }
    }




}


export default authValidation;