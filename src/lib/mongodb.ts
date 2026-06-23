import mongoose from "mongoose";
const connectDb=async()=>{
    try{
        await mongoose.connect(process.env.MONGODB_URI!);
        console.log("Database Connected ")

    }catch(e){
        console.log(`Error in DB`,e)

    }
}
export default connectDb