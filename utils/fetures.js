import mongoose from "mongoose"
import {serialize} from "cookie"
import  jwt  from "jsonwebtoken"
import { errorHandler } from "@/middleware/error"
import { User } from "@/model/user"


export const connectDb=async()=>{
try {
    const {connection}=  await mongoose.connect(process.env.MONGO_URL,{
        dbName:"NextTodo"
    })
    console.log(`Database is connected with ${connection.host}`)
} catch (error) {
    console.log(`Error while connected to database${error}` )
    
}
}


export const sendToken=(resp,token,set)=>{


    resp.setHeader(
        "Set-Cookie",
        serialize("token",set?token:"",{
            path:"/",
            httpOnly:true,
            maxAge:set?15 * 24 * 60 * 60 *1000:0,
        })
    )
}

export const genrateToken= (_id)=>{
    return  jwt.sign({_id},process.env.JWT_SECRET)
}


export const checkAuth=async (resp,req)=>{
    const cookie=req.headers.cookie
    if(!cookie) return errorHandler(resp,401,"Please Login to access the resoucrces")
    const token=cookie.split("=")[1];

    const decodes=jwt.verify(token,process.env.JWT_SECRET)

    return await User.findById(decodes._id)

}