import mongoose from "mongoose";
import Cookies from "js-cookie";
import { serialize } from "cookie";
import jwt from "jsonwebtoken";
import { User } from "@/models/user";

export const dbConnect = async () => {
  const { connection } = await mongoose.connect(process.env.DB_URL, {
    dbName: "todo13",
  });
  console.log(`Database is connected ${connection.host}`);
};

export const cookieSetter = (res, token, set) => {
  try {
    res.setHeader(
      "Set-Cookie",
      serialize("token", set ? token : "", {
        path: "/",
        httpOnly: true,
        maxAge: set ? 15 * 24 * 60 * 60 * 1000 : 0,
      })
    );
  } catch (error) {
    console.log(error);
  }
};

export const tokenGenerate = (id) => {
  return jwt.sign({ id }, process.env.SECRET);
};

export const checkAuth = async (req) => {
  const cookie = req.headers.cookie;

  if (!cookie) {
    return null;
  }
  const token = cookie.split("=")[1];
  const decode = jwt.verify(token, process.env.SECRET);
  return await User.findById(decode.id);
};
