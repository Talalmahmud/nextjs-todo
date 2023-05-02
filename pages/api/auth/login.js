import { errorHandler } from "@/middleware/error";
import { User } from "@/models/user";
import { cookieSetter, dbConnect, tokenGenerate } from "@/utils/features";
import bcrypt from "bcrypt";

const handler = async (req, res, next) => {
  const { email, password } = req.body;
  console.log(email);
  if (!email || !password) {
    return errorHandler(res, 400, "Email or password should not be empty");
  }

  await dbConnect();

  const user = await User.findOne({ email }).select("+password");
  if (!user) {
    return errorHandler(res, 402, "User or password is incorrected.");
  }
  const passwordMatch = await bcrypt.compare(password, user.password);
  if (!passwordMatch) {
    return errorHandler(res, 402, "User or password is incorrected.");
  }
  const token = tokenGenerate(user._id);
  cookieSetter(res, token, true);

  return res.status(200).json({
    success: true,
    message: `Welcome ${user.name}, you loged in successful.`,
    user,
  });
};

export default handler;
