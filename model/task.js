import mongoose from "mongoose";


const taskScheme=new mongoose.Schema({
    title:{
        type:String,
        required:true,
    },
    descrption:{
        type:String,
        required:true,

    },
    isCompleted:{
        type:Boolean,
        default:false
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    createdAt:{
        type:Date,
        default:Date.now
        }
})


mongoose.models={}
export const Task=mongoose.model("Task",taskScheme)