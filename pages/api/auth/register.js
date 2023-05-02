import { errorHandler } from "@/middleware/error";
import { User } from "@/models/user";
import { cookieSetter, dbConnect, tokenGenerate } from "@/utils/features";
import bcrypt from "bcrypt";

const handler = async (req, res, next) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    return errorHandler(
      res,
      400,
      "Name or email or password should not be empty"
    );
  }

  await dbConnect();

  const user = await User.findOne({ email });
  if (user) {
    return errorHandler(res, 402, "User already registered");
  } else {
    req.body.password = await bcrypt.hash(password, 10);
    const newuser = await User.create(req.body);
    const token = tokenGenerate(newuser._id);
    cookieSetter(res, token, true);

    return res.status(400).json({
      success: true,
      message: "Register successfully",
      newuser,
    });
  }
};

export default handler;
