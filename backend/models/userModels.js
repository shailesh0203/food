import mongoose  from "mongoose";

//You would use minimize: false when you want to keep empty objects in the document even if they don’t contain any data.
const userSchema = new mongoose.Schema({
    name: {type: String , required: true },
    email:{type: String,required:true,unique: true },
    password:{type: String , required: true },
    cartData:{type: Object  ,default:{}},


},{minimize: false});
const userModel = mongoose.models.user || mongoose.model('user',userSchema);

export default userModel;