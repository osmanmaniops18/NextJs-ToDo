import { checkAuth, connectDb } from "@/utils/fetures";
import { Task } from "@/model/task";
import {  errorHandler } from "@/middleware/error";

const handler = async (req, resp) => {
  try {
    if (req.method !== "GET")
      return errorHandler(resp, 500, "Only GET method is allowed");

    await connectDb();

    const user = await checkAuth(resp,req);

    const tasks = await Task.find({ user: user._id });

    resp.status(200).json({
      success: true,
      tasks,
    });
  } catch (error) {
    return errorHandler(resp, 500, `Internal Server ${error}`);
  }
};

export default handler;
