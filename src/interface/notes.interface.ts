import type { Types } from "mongoose"

export interface INotes {
    title: string,
    content: string, 
    category: "personal" | "work" | "study" | "others",
    pinned: boolean,
    tags: {
        label: string,
        color: string,
    },
    createAt: Date
    user: Types.ObjectId
}