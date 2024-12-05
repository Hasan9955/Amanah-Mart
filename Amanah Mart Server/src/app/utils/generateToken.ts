import jwt, { JwtPayload, Secret } from 'jsonwebtoken';
import AppError from './AppError';
import status from "http-status";

type TTokenPayload = {
    id: string,
    role: string,
    email: string
};

export const generateToken = (payload: TTokenPayload, secret: Secret, expiresIn: string) => {
    return jwt.sign(
        payload,
        secret,
        {
            expiresIn,
            algorithm: 'HS256'
        }
    )
}


export const verifyToken = (token: string, secret: Secret) => {
    try {
        return jwt.verify(token, secret) as JwtPayload;
    } catch (error) {
        throw new AppError(status.BAD_REQUEST, 'Invalid token!')
    }
}