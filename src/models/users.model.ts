import { model, Schema } from "mongoose";
import { type IUser, type UserStaticMethod } from "../interface/users.interface.js";
import bcrypt from "bcrypt"
import { Note } from "./noteModel.js";

const usersSchema = new Schema<IUser, UserStaticMethod> ({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: [true, "Email already used, Try with another email"],
        lowercase: true,
        validate: {
            validator: function(v) {
                return /^[A-Za-z0-9.!#$%&'*+/=?^_`{|}~-]+@[A-Za-z0-9](?:[A-Za-z0-9-]{0,61}[A-Za-z0-9])?(?:\.[A-Za-z]{2,})+$/.test(v)
            },
            message: props => `${props.value} is not a valid Email!`
        }
    },
    age: {
        type: Number,
        required: true,
        min: [18, "age must be at least 18, got {VALUE}"],
        max: 80
    },
    gender: {
        type: String,
        enum: ["Male", "Female", "Others"],
        required: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ["Admin", "User"],
        default: "User"
    }
},
{
    versionKey: false,
    timestamps: true
}
)

usersSchema.method("hashPassword", async function(p: string) {
    this.password = await bcrypt.hash(p, 10)
})

usersSchema.static("hashPasswordStatic", async function(p: string) {
    const password = await bcrypt.hash(p, 10)
    return password
})

usersSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  try {
    const saltRounds = 10;
    this.password = await bcrypt.hash(this.password, saltRounds);
    next();
  } catch (error) {
    next(error as Error);
  }
});

usersSchema.post("findOneAndDelete", async function (doc, next){
    if(doc) {
        await Note.deleteMany({user: doc._id})
    }
})

export const Users = model<IUser, UserStaticMethod>("Users", usersSchema)