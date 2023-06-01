import { catchAsyncError, errorHandler } from "@/middleware/error";
import { User } from "@/model/user";
import { connectDb, genrateToken, sendToken } from "@/utils/fetures";
import bcrypt from "bcrypt"




// import necessary dependencies and utilities

const registerHandler = async (req, resp) => {
    try {
      if (req.method !== "POST") {
        return errorHandler(resp, 500, "Only Post method is allowed");
      }
  
      const { name, email, password } = req.body;
      if (!name || !email || !password) {
        return errorHandler(resp, 400, "Please provide all fields");
      }
  
      await connectDb();
      let user = await User.findOne({ email });
      if (user) {
        return errorHandler(resp, 400, "User Already Exists");
      }

      const hashedPassword= await bcrypt.hash(password,10)
  
      user = await User.create({ name, email, password:hashedPassword });
  
      const token = genrateToken(user._id);
  
      sendToken(resp, token, true);
  
      return resp.status(201).json({
        success: true,
        message: "User Registered Successfully",
        user,
      });
    } catch (error) {
      return errorHandler(resp, 500, `Internal Server ${error}`);
    }
  };
  
  export default registerHandler;
  