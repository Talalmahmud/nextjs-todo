import { errorHandler } from "@/middleware/error";

const { checkAuth } = require("@/utils/features");

const handler = async (req, res) => {
  const user = await checkAuth(req);
  if (!user) return errorHandler(res, 401, "Login First");
  res.status(200).json({
    success: true,
    user,
  });
};

export default handler;
