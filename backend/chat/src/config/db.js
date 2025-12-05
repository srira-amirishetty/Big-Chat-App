import mongoose from "mongoose";
import dotenv from 'dotenv'
dotenv.config()

const connectDb = async() => {
    const url = process.env.MONGO_URI 

    if(!url){
        throw new Error("MONGO URL is not defined")
    }

    try{
        await mongoose.connect(url)
        console.log("connected to mongodb")
    }catch(error){
        console.error("Failed to connect to mongodb",error)
        process.exit(1);
    }
    
}

export default connectDb