import { Router } from "express";
import * as users from "../controller/user.controller.js"

const userRouter = Router()

userRouter
    .route("/")
    .get(users.getUser)
    .post(users.createUser)
userRouter
    .route("/:userId")
    .get(users.getUserById)
    .put(users.updateUser)
    .delete(users.deleteUser)

export default userRouter;