import mongoose from "mongoose";

const userCollection = "user";

const userSchema = new mongoose.Schema({
    first_name: String,
    last_name: String,
    email: String,      //me da error poner email: {type: String, unique: true}
    password: String,
    age: Number,
})



export const userModel = mongoose.model(userCollection, userSchema) 