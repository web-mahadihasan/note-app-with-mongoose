import {type Request, type Response } from "express"
import { Note } from "../models/noteModel.js"

export const createNote = async (req: Request, res: Response) => {
    const note = req.body
    const response = await Note.create(note)
    console.log("response", response)
    res.status(201).json({message: "Note Create successfully", data: note})
}

export const getNotes = async (req: Request, res: Response) => {
    const notes = await Note.find()
    res.status(200).json({message: "Note get successfully", notes: notes})
}

export const getNoteById = async (req: Request, res: Response) => {
    const noteId = req.params.noteId
    console.log(noteId)

    const note = await Note.findById(noteId)
    res.status(200).json({message: "Single note get successfully", note: note})
}