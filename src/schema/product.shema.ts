import {object,number,string,TypeOf} from "zod"
const payload = {
       body: object({
              title: string({
                     required_error: "Title is required"
              }),
              description: string({
                     required_error: "description is required"
              }).min(20, "Description should be 20 chars long"),
              price: number({
                     required_error: "price is required"
              }),
              image: string({
                     required_error: "image is required"
              }),

       })
}

const params = {
       params: object({
              productId: string({
                     required_error: "productId is required"
              })
       })
}

export const createProductSchema = object({
       ...payload
})

export const updateProductSchema = object({
       ...payload,
       ...params
})
export const deleteProductSchema = object({
       ...params
})
export const getProductSchema = object({
       ...params
})

export type createProductInput = TypeOf<typeof createProductSchema>;
export type updateProductInput = TypeOf<typeof updateProductSchema>;
export type readProductInput = TypeOf<typeof getProductSchema>;
export type deleteProductInput = TypeOf<typeof deleteProductSchema>;