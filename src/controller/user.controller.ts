import {type Request, type Response } from "express"
import { Users } from "../models/users.model.js"
import z from "zod"

const userZodSchema = z.object({
    name: z.string(), 
    email: z.string(),
    age: z.number(),
    gender: z.string(),
    password: z.string(),
    role: z.string().optional()
})


export const createUser = async (req: Request, res: Response) => {
    try {
        const body = await userZodSchema.parseAsync(req.body)
        // Static method for save database

        // const password = await Users.hashPasswordStatic(body.password)
        // body.password = password

        const response = await Users.create(body)

        // instance method to save database

        // const user = new Users(body)
        // await user.hashPassword(user.password)
        // const response = await user.save()

        res.status(201).json({message: "User created successfully", data: response})
    } catch (error: any) {
        console.log(error)
        res.status(400).json({success: false, message: error.message, error})
    }
}

export const getUser = async (req: Request, res: Response) => {
    const users = await Users.find()
    res.status(200).json({message: "Note get successfully", data: users})
}

export const getUserById = async (req: Request, res: Response) => {
    const userId = req.params.userId

    const note = await Users.findById(userId)
    res.status(200).json({message: "Single note get successfully", note: note})
}

export const updateUser = async (req: Request, res: Response) => {
    const userId = req.params.userId
    const updateUser = req.body

    const response = await Users.findByIdAndUpdate(userId, updateUser, {new: true})
    res.status(200).json({message: "User data update successfully", user: response})
}

export const deleteUser = async (req: Request, res: Response) => {
    const userId = req.params.userId

    const response = await Users.findByIdAndDelete(userId)
    res.status(200).json({message: "User delete successfully", user: response})
}