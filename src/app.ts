import express, { type Application, type Request, type Response } from "express"
import noteRouter from "./router/note.route.js"
import userRouter from "./router/users.route.js"

const app: Application = express()

app.use(express.json())

app.get("/", (req: Request, res: Response) => {
    res.send("This is root route")
})

app.use("/api/v1/note", noteRouter)
app.use("/api/v1/users", userRouter)

export default app;
    