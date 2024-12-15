import { prisma } from "../../utils/prisma"
import { TCategory } from "./category.constant";



const getAllCategories = async () => {
    const result = await prisma.category.findMany();

    return result;
}

const getSingleCategory = async (id: string) => {
    const result = await prisma.category.findFirstOrThrow({
        where: {
            id
        }
    })

    return result;
}


const createCategory = async (payload: TCategory) => {
    const result = await prisma.category.create({
        data: payload
    })
}


const updateCategory = async (id: string, payload: Partial<TCategory>) => {
    await prisma.category.findFirstOrThrow({
        where: {
            id
        }
    })

    const result = await prisma.category.update({
        where: {
            id
        },
        data: payload
    })
}



const deleteCategory = async (id: string) => {
    await prisma.category.findFirstOrThrow({
        where: {
            id
        }
    })

    const result = await prisma.category.delete({
        where: {
            id
        }
    })
}

export const categoryServices = {
    getAllCategories, 
    getSingleCategory,
    createCategory,
    updateCategory,
    deleteCategory
}