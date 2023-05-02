const { errorHandler } = require("@/middleware/error");
const { Task } = require("@/models/task");
const { dbConnect, checkAuth } = require("@/utils/features");

const handler = async (req, res) => {
  await dbConnect();

  const user = await checkAuth(req);

  if (!user) {
    return errorHandler(res, 400, "You must log in first");
  }

  const task = await Task.find({ user: user._id });

  res.status(200).json({
    success: true,
    task,
  });
};

export default handler;
