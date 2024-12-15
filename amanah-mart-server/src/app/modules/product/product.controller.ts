import catchAsync from "../../utils/catchAsync";
import pick from "../../utils/pick";
import sendResponse from "../../utils/sendResponse";
import { productFilterableFields } from "./product.contant";
import { productServices } from "./product.service";
import { createProductValidation } from "./product.validation";



const getAllProduct = catchAsync(async (req, res) => {
    const query = req.query;
    const filterQuery = pick(query, productFilterableFields);
    const options = pick(query, ['page', 'limit', 'sortBy', 'sortOrder']);
    const result = await productServices.getAllProducts(filterQuery, options)

    sendResponse(res, {
        statusCode: 200,
        message: "Products retrieved successfully!",
        data: result
    })
})

const getSingleProduct = catchAsync(async (req, res) => {
     
    const result = await productServices.getSingleProduct(req.params.id)

    sendResponse(res, {
        statusCode: 200,
        message: "Product retrieved successfully!",
        data: result
    })
})

const createProduct = catchAsync(async (req, res) => {
     
    req.body = createProductValidation.parse(JSON.parse(req.body.data))
    
    const result = await productServices.createProduct(req)

    sendResponse(res, {
        statusCode: 201,
        message: "Product created successfully!",
        data: result
    })
})


const updateProduct = catchAsync(async (req, res) => {

    if(req.body.data){
        req.body = createProductValidation.parse(JSON.parse(req.body.data))
    }
    const result = await productServices.updateProduct(req)

    sendResponse(res, {
        statusCode: 200,
        message: "Product updated successfully!",
        data: result
    })
})


const deleteProduct = catchAsync(async (req, res) => {
    const result = await productServices.deleteProduct(req.params.id)

    sendResponse(res, {
        statusCode: 200,
        message: "Product deleted successfully!",
        data: result
    })
})


export const productControllers = {
    getAllProduct,
    getSingleProduct,
    createProduct,
    updateProduct,
    deleteProduct
}