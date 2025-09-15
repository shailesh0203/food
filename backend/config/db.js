import mongoose from "mongoose";
export const connectDB = async()=>{
    await mongoose.connect('mongodb+srv://arshitbhootna:Password123@cluster0.dksud.mongodb.net/food-del').then(()=> console.log("DB connected "));
}