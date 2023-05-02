import { errorHandler } from "@/middleware/error";
import { cookieSetter } from "@/utils/features";

const handler = async (req, res, next) => {
  cookieSetter(res, null, false);

  return res.status(200).json({
    success: true,
    message: `User logout successful.`,
  });
};

export default handler;
