import { errorHandler } from "@/middleware/error";
import { Task } from "@/model/task";
import { checkAuth, connectDb } from "@/utils/fetures";

const handler = async (req, resp) => {
  try {
    await connectDb();
    const user = await checkAuth(resp, req);

    const taskId = req.query.id;
    const task = await Task.findById(taskId);
    if (!task) return errorHandler(resp, 404, "Task not found");
    if (req.method === "PUT") {
      task.isCompleted = !task.isCompleted;

      await task.save();

      resp.status(200).json({
        success: true,
        message: "Task Updated Successfully",
      });
    } else if (req.method === "DELETE") {
    await    task.deleteOne();
    
    resp.status(200).json({
        success: true,
        message: "Task Deleted Successfully",
      });
    } else {
      return errorHandler(resp, 500, "Only PUT or DELETE method is allowed");
    }

   
  } catch (error) {
    return errorHandler(resp, 500, `Internal Server ${error}`);
  }
};

export default handler;
