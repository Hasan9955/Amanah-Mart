import catchAsync from "../../utils/catchAsync"
import sendResponse from "../../utils/sendResponse"
import { categoryServices } from "./category.service"




const getAllCategories = catchAsync(async ( req, res ) => {

    const result = await categoryServices.getAllCategories();
    
    sendResponse(res, {
        statusCode: 200,
        message: "Categories retrieved successfully!",
        data: result
    })
})
const getSingleCategory = catchAsync(async ( req, res ) => {

    const result = await categoryServices.getSingleCategory(req.params.id);
    
    sendResponse(res, {
        statusCode: 200,
        message: "Category retrieved successfully!",
        data: result
    })
})

const createCategory = catchAsync(async ( req, res ) => {

    const result = await categoryServices.createCategory(req.body);
    
    sendResponse(res, {
        statusCode: 200,
        message: "Category created successfully!",
        data: result
    })
})
const updateCategory = catchAsync(async ( req, res ) => {

    const result = await categoryServices.updateCategory(req.params.id, req.body);
    
    sendResponse(res, {
        statusCode: 200,
        message: "Category updated successfully!",
        data: result
    })
})

const deleteCategory = catchAsync(async ( req, res ) => {

    const result = await categoryServices.deleteCategory(req.params.id);
    
    sendResponse(res, {
        statusCode: 200,
        message: "Category deleted successfully!",
        data: result
    })
})




export const categoryControllers = {
    getAllCategories, 
    getSingleCategory,
    createCategory,
    updateCategory,
    deleteCategory
}