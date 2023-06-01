import { errorHandler } from "@/middleware/error";

import { sendToken } from "@/utils/fetures";

// import necessary dependencies and utilities

const logoutHandler = async (req, resp) => {
  try {
    if (req.method !== "GET") {
      return errorHandler(resp, 500, "Only GET method is allowed");
    }

    sendToken(resp, null, false);

    return resp.status(201).json({
      success: true,
      message: "Logged Out Successfully",
    });
  } catch (error) {
    return errorHandler(resp, 500, `Internal Server ${error}`);
  }
};

export default logoutHandler;
