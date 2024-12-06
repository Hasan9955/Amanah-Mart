import config from "../../config";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { userServices } from "./user.service";



const createUser = catchAsync(async ( req, res ) => {
     
    const result = await userServices.createUser(req.body)
    res.cookie('refreshToken', result.refreshToken, {
        secure: config.env === 'production' ? true : false,
        httpOnly: true
    })

    sendResponse(res, {
        statusCode: 201,
        message: "User created successfully!",
        data: {
            data: result.data,
            token: result.token
        }
    })
})


const getAll = catchAsync(async ( req, res ) => {
    const result = await userServices.getAll( )
    
    sendResponse(res, {
        statusCode: 200,
        message: "Users retrieved successfully!",
        data: result
    })
})

const myProfile = catchAsync(async ( req, res ) => {

    const result = await userServices.myProfile(req.user)
    
    sendResponse(res, {
        statusCode: 200,
        message: "User retrieved successfully!",
        data: result
    })
})

const updateUser = catchAsync(async ( req, res ) => {
    const result = await userServices.updateUser()
    
    sendResponse(res, {
        statusCode: 200,
        message: "User updated successfully!",
        data: result
    })
})

const deleteUser = catchAsync(async ( req, res ) => {
    const result = await userServices.deleteUser()
    
    sendResponse(res, {
        statusCode: 200,
        message: "User delete successfully!",
        data: result
    })
})


export const userControllers = {
    createUser,
    getAll,
    myProfile,
    updateUser,
    deleteUser
}