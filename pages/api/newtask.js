import { errorHandler } from "@/middleware/error";
import { Task } from "@/models/task";
import { User } from "@/models/user";
import { checkAuth, dbConnect } from "@/utils/features";

const handler = async (req, res) => {
  if (req.method !== "POST") {
    return errorHandler(res, 400, "Only post method");
  } else {
    await dbConnect();

    const { title, description } = req.body;
    const user = await checkAuth(req);
    const newtask = await Task.create({
      title,
      description,
      user: user._id,
    });

    res.status(200).json({
      success: true,
      message: "New Task is added",
      newtask,
    });
  }
};

export default handler;
