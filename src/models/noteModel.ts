import { model, Schema, Types } from "mongoose";
import { type INotes } from "../interface/notes.interface.js";

const noteSchema = new Schema<INotes>({
    title: {type: String, required: true, trim: true},
    content: {type: String, default: ""},
    category: {
        type: String,
        enum: ["personal", "work", "study", "others"],
        default: "personal"
    },
    pinned: {
        type: Boolean,
        default: false
    },
    tags: {
        label: {type: String, required: true},
        color: {type: String, default: "gray"}
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: "Users",
        required: true
    }
    
}, {
    versionKey: false,
    timestamps: true,
})

export const Note = model<INotes>('Note', noteSchema);
