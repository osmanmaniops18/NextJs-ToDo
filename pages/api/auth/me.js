import { errorHandler } from "@/middleware/error";
import { checkAuth } from "@/utils/fetures";

// import necessary dependencies and utilities

const loginHandler = async (req, resp) => {
  try {
    if (req.method !== "GET") {
      return errorHandler(resp, 500, "Only GET method is allowed");
    }

    const user = await checkAuth(resp, req);

    return resp.status(201).json({
      success: true,
      user,
    });
  } catch (error) {
    return errorHandler(resp, 500, `Internal Server ${error}`);
  }
};

export default loginHandler;
