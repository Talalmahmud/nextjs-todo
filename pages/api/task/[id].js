const { errorHandler } = require("@/middleware/error");
const { Task } = require("@/models/task");
const { checkAuth, dbConnect } = require("@/utils/features");

const handler = async (req, res) => {
  const user = await checkAuth(req);
  if (!user) return errorHandler(res, "Login First", 401);

  await dbConnect();

  const taskId = req.query.id;

  const task = await Task.findById(taskId);

  if (!task) return errorHandler(res, 404, "Task not found");

  if (req.method === "PUT") {
    task.isCompleted = !task.isCompleted;

    await task.save();

    res.status(200).json({
      success: true,
      message: "Task Updated Successfully",
    });
  } else if (req.method === "DELETE") {
    console.log("yes");
    await task.deleteOne();
    res.status(200).json({
      success: true,
      message: "Task Deleted Successfully",
    });
  } else {
    errorHandler(res, 400, "This method is not available");
  }
};
export default handler;
