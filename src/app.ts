import express, { type Application, type Request, type Response } from "express"
import noteRouter from "./router/noteRouter.js"

const app: Application = express()

app.use(express.json())

app.get("/", (req: Request, res: Response) => {
    res.send("This is root route")
})

app.use("/api/v1/note", noteRouter)

export default app;
