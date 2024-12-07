import config from "../../config";
import catchAsync from "../../utils/catchAsync";
import pick from "../../utils/pick";
import sendResponse from "../../utils/sendResponse";
import { userFilterableFields } from "./user.constant";
import { userServices } from "./user.service";
import { userValidation } from "./user.validation";





const getAll = catchAsync(async ( req, res ) => {
    const query = req.query;
    const filterQuery = pick(query, userFilterableFields);
    const options = pick(query, ['page', 'limit', 'sortBy', 'sortOrder']);
    const result = await userServices.getAll(filterQuery, options);
    
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



const createUser = catchAsync(async ( req, res ) => {
      
    req.body = userValidation.createUserValidation.parse(JSON.parse(req.body.data))
    const result = await userServices.createUser(req)
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


const updateUser = catchAsync(async ( req, res ) => {
    
    if(req.body.data){
        req.body = userValidation.updateUserValidation.parse(JSON.parse(req.body.data))
    }
    const result = await userServices.updateUser(req)
    
    sendResponse(res, {
        statusCode: 200,
        message: "User updated successfully!",
        data: result
    })
})

const deleteUser = catchAsync(async ( req, res ) => {
    const result = await userServices.deleteUser(req.params.id)
    
    sendResponse(res, {
        statusCode: 200,
        message: "User delete successfully!",
        data: result
    })
})

const softDelete = catchAsync(async ( req, res ) => {
    const result = await userServices.softDelete(req.user.id)
    
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
    deleteUser,
    softDelete
}