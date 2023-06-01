import { checkAuth, connectDb } from "@/utils/fetures"
import { Task } from "@/model/task";
import { errorHandler } from "@/middleware/error";



const handler=async(req,resp)=>{

   try {
    if(req.method!=="POST") return errorHandler(resp,500,"Only Post method is allowed")


    await connectDb();

    const {title,descrption}=req.body
    if(!title || !descrption) return errorHandler(resp,400,"Please fill all fields")

    const user = await checkAuth(resp, req);

    await Task.create({
        title,
        descrption,
        user:user._id
    })


 resp.status(200).json({
    success:true,
    message:"Task Added Successfully"
 })
   } catch (error) {
    return errorHandler(resp, 500, `Internal Server ${error}`);
   }
}



export default handler 