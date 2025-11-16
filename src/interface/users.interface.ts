import { Model, type Document } from "mongoose";

export interface IUser extends Document {
    name: string, 
    email: string,
    age: number,
    gender: "Male" | "Female" | "Others",
    password: string, 
    role: "Admin" | "User",
    hashPassword(password: string): Promise<any>
}

export interface UserStaticMethod extends Model<IUser>{
    hashPasswordStatic(password: string): Promise<any>
}