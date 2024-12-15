import { Router } from "express";
import { NotificationControllers } from "./notification.controller";
import authValidation from "../../middleware/authValidation";
import { UserRole } from "@prisma/client";
import { createNotificationSchema } from "./notification.validation";
import validateRequest from "../../middleware/zodValidation";


const router = Router();


router.get('/all-notification', NotificationControllers.getAllNotifications)

router.get('/',
    authValidation(UserRole.ADMIN, UserRole.VENDOR, UserRole.CUSTOMER),
    NotificationControllers.getMyNotifications)

router.get('/:id', NotificationControllers.getSingleNotification)

router.post('/', validateRequest(createNotificationSchema), NotificationControllers.createNotification)

router.patch('/:id', NotificationControllers.updateNotification)

router.delete('/:id', NotificationControllers.deleteNotification)



export const notificationRoutes = router;