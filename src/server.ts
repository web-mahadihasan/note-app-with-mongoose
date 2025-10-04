// mongodb+srv://test_level_two:XyP5K7xBPy2qas9g@project-0.p8l0k.mongodb.net/?retryWrites=true&w=majority&appName=Project-0
import type { Server } from "http";
import mongoose from "mongoose";
import app from "./app.js";

let server: Server

const PORT = 8000;

async function main() {
    try {
        await mongoose.connect('mongodb+srv://test_level_two:XyP5K7xBPy2qas9g@project-0.p8l0k.mongodb.net/mongoose-note-app?retryWrites=true&w=majority&appName=Project-0');
        console.log("Mongodb connect with mongoose")
        server = app.listen(PORT, () => {
            console.log(`Server is running row ${PORT}`)
        })
    } catch (error) {
        console.log(error)
    }
}

main()