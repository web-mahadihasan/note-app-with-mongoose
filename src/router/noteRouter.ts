import { Router } from "express";
import * as note from "../controller/noteController.js"

const noteRouter = Router()

noteRouter
    .route("/")
    .get(note.getNotes)
    .post(note.createNote)
noteRouter
    .route("/:noteId")
    .get(note.getNoteById)

export default noteRouter;