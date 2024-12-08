import { prisma } from "../../utils/prisma";
import { INotification } from "./notification.constant";

const getAllNotifications = async () => {
    const result = await prisma.notification.findMany();
    return result;
}

const getSingleNotification = async (id: string) => {
    const result = await prisma.notification.findFirstOrThrow({
        where: {
            id
        }
    })

    return result;
}


const getMyNotifications = async (id: string) => {
    const result = await prisma.notification.findMany({
        where: {
            userId: id
        }
    })

    return result;
}




const createNotification = async (payload: INotification) => {
    
    const result = await prisma.notification.create({
        data: payload
    })
}


const updateNotification = async (id: string, payload: Partial<INotification>) => {
    await prisma.notification.findFirstOrThrow({
        where: {
            id
        }
    })

    const result = await prisma.notification.update({
        where: {
            id
        },
        data: payload
    })
}



const deleteNotification = async (id: string) => {
    await prisma.notification.findFirstOrThrow({
        where: {
            id
        }
    })

    const result = await prisma.notification.delete({
        where: {
            id
        }
    })
}

export const NotificationServices = {
    getAllNotifications, 
    getSingleNotification,
    getMyNotifications,
    createNotification,
    updateNotification,
    deleteNotification
}