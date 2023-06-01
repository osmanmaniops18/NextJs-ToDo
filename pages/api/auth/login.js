import { catchAsyncError, errorHandler } from "@/middleware/error";
import { User } from "@/model/user";
import { connectDb, genrateToken, sendToken } from "@/utils/fetures";
import bcrypt from "bcrypt"




// import necessary dependencies and utilities

const loginHandler = async (req, resp) => {
    try {
      if (req.method !== "POST") {
        return errorHandler(resp, 500, "Only Post method is allowed");
      }
   
  
      const { email, password } = req.body;
      if ( !email || !password) {
        return errorHandler(resp, 400, "Please provide all fields");
      }
  
      await connectDb();
    const user = await User.findOne({ email }).select("+password");
      if (!user) {
        return errorHandler(resp, 400, "invalid Email and password");
      }

      const isMatch= await bcrypt.compare(password,user.password)
      if (!isMatch) {
        return errorHandler(resp, 400, "invalid Email and password");
      }
  
    
  
      const token = genrateToken(user._id);
  
      sendToken(resp, token, true);
  
      return resp.status(201).json({
        success: true,
        message: `Welcome back ${user.name}`,
        user
      });
    } catch (error) {
      return errorHandler(resp, 500, `Internal Server ${error}`);
    }
  };
  
  export default loginHandler;
  