import { shopValidation } from './shop.validation';
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { shopServices } from "./shop.service";
import pick from '../../utils/pick';
import { shopFilterableFields } from './shop.constant';



const getAllShop = catchAsync(async (req, res) => {
    const query = req.query;
    const filterQuery = pick(query, shopFilterableFields);
    const options = pick(query, ['page', 'limit', 'sortBy', 'sortOrder']);
    const result = await shopServices.getAllShop(filterQuery, options)

    sendResponse(res, {
        statusCode: 201,
        message: "Shops retrieved successfully!",
        data: result
    })
})

const getSingleShop = catchAsync(async (req, res) => {
    const result = await shopServices.getSingleShop(req.params.id)

    sendResponse(res, {
        statusCode: 200,
        message: "Shop retrieved successfully!",
        data: result
    })
})

const createShop = catchAsync(async (req, res) => {

    req.body = shopValidation.createShopValidation.parse(JSON.parse(req.body.data))
    
    const result = await shopServices.createShop(req)

    sendResponse(res, {
        statusCode: 200,
        message: "Shop created successfully!",
        data: result
    })
})

const updateShop = catchAsync(async (req, res) => {

    if(req.body.data){
        req.body = shopValidation.updateShopValidation.parse(JSON.parse(req.body.data))
    }
    const result = await shopServices.updateShop(req)

    sendResponse(res, {
        statusCode: 200,
        message: "Shop updated successfully!",
        data: result
    })
})


const deleteShop = catchAsync(async (req, res) => {
    const result = await shopServices.deleteShop(req.params.id)

    sendResponse(res, {
        statusCode: 200,
        message: "Shop deleted successfully!",
        data: result
    })
})



export const shopController = {
    getAllShop,
    getSingleShop,
    updateShop,
    createShop,
    deleteShop
}