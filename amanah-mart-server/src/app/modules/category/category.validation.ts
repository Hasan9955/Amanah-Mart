import { z } from "zod";


export const createCategoryValidation = z.object({
    body: z.object({
        name: z.string(),
        description: z.string()
    })
})






export const updateCategoryValidation = z.object({
    body: z.object({
        name: z.string(),
        description: z.string()
    })
})