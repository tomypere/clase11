import mongoose from "mongoose";

const urlDb =  "mongodb+srv://admin:tomastauscher@e-commerce.pgblped.mongodb.net/ecommerce";

export const connectMongoDB = async () => {
    try{
        mongoose.connect(urlDb);
        console.log("Mongo DB Conectado");
    }catch(error){
        console.log(error)
    }
}