import { registerSchema, signinSchema } from "../schemas/auth";
import User from "../models/auth";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

export const signup = async (request, response) => {
  const { username, email, password } = request.body;

  const { error } = registerSchema.validate(request.body, {
    abortEarly: false,
  });
  if (error) {
    const errorMessage = error.details.map((message) => message.message);
    return response.status(400).json(errorMessage); // Thêm return để dừng hàm sau khi phản hồi được gửi
  }

  const existUser = await User.findOne({ email: email });
  if (existUser) {
    return response.status(400).json({ errorMessage: "Email đã tồn tại" });
  }

  const hashedPassword = await bcryptjs.hash(password, 10);
  const user = await User({ username, email, password: hashedPassword }).save();

  return response.status(201).json({ message: "Đăng ký thành công", user }); // Sử dụng return để dừng hàm
};

export const signin = async (request, response) => {
  const { email, password } = request.body;

  const { error } = signinSchema.validate(request.body, { abortEarly: false });
  if (error) {
    const message = error.details.map((message) => message.message);
    return response.status(400).json({ message }); // Thêm return
  }

  const existUser = await User.findOne({ email: email });
  if (!existUser) {
    return response.status(400).json({ message: "Email không tồn tại" }); // Thêm return
  }

  const isValidPassword = await bcryptjs.compare(password, existUser.password);
  if (!isValidPassword) {
    return response.status(400).json({ message: "Mật khẩu không đúng" }); // Thêm return
  }

  const token = jwt.sign({ id: existUser._id }, "123456", { expiresIn: "1d" });
  response.cookie("token", token, { httpOnly: true });

  existUser.password = undefined;
  return response.status(200).json({
    message: "Đăng nhập thành công",
    user: existUser,
    token,
  }); // Sử dụng return
};
