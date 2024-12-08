import catchAsync from "../../utils/catchAsync"
import sendResponse from "../../utils/sendResponse" 
import { NotificationServices } from "./notification.service";




const getAllNotifications = catchAsync(async ( req, res ) => {

    const result = await NotificationServices.getAllNotifications();
    
    sendResponse(res, {
        statusCode: 200,
        message: "Notifications retrieved successfully!",
        data: result
    })
})

const getMyNotifications = catchAsync(async ( req, res ) => {
    const id = req.user.id
    const result = await NotificationServices.getMyNotifications(id);
    
    sendResponse(res, {
        statusCode: 200,
        message: "Notifications retrieved successfully!",
        data: result
    })
})


const getSingleNotification = catchAsync(async ( req, res ) => {

    const result = await NotificationServices.getSingleNotification(req.params.id);
    
    sendResponse(res, {
        statusCode: 200,
        message: "Notification retrieved successfully!",
        data: result
    })
})

const createNotification = catchAsync(async ( req, res ) => {

    const result = await NotificationServices.createNotification(req.body);
    
    sendResponse(res, {
        statusCode: 200,
        message: "Notification created successfully!",
        data: result
    })
})

const updateNotification = catchAsync(async ( req, res ) => {

    const result = await NotificationServices.updateNotification(req.params.id, req.body);
    
    sendResponse(res, {
        statusCode: 200,
        message: "Notification updated successfully!",
        data: result
    })
})

const deleteNotification = catchAsync(async ( req, res ) => {

    const result = await NotificationServices.deleteNotification(req.params.id);
    
    sendResponse(res, {
        statusCode: 200,
        message: "Notification deleted successfully!",
        data: result
    })
})




export const NotificationControllers = {
    getAllNotifications, 
    getMyNotifications,
    getSingleNotification,
    createNotification,
    updateNotification,
    deleteNotification
}