import mongoose from "mongoose";

const companySchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        unique:true
    },
    description:{
        type:String, 
    },
    website:{
        type:String 
    },
    location:{
        type:String 
    },
    logo:{
        type:String // URL to company logo
    },
    industry: {
        type: String,
    },
    email: {
        type: String,
    },
    phone: {
        type: String,
    },
    status: {
        type: String,
        enum: ["active", "inactive", "pending", "suspended"],
        default: "pending",
    },
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true
    }
},{timestamps:true})
export const Company = mongoose.model("Company", companySchema);