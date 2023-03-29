import jwt from "jsonwebtoken";
import User from "../model/auth";
import { signinSchema, signupSchema } from "../schemas/auth";
import bcrypt from "bcryptjs";
export const signup = async (req, res) => {
  try {
    // validate đầu vào
    const { error } = signupSchema.validate(req.body, { abortEarly: false });
    if (error) {
      const errors = error.details.map((err) => err.message);

      return res.status(400).json({
        messages: errors,
      });
    }
    // Kiểm tra trong db có tk không?
    const userExist = await User.findOne({ email: req.body.email });
    if (userExist) {
      return res.status(400).json({
        messages: "Email đã tồn tại",
      });
    }
    // Mã hóa mật khẩu

    const hashedPassword = await bcrypt.hash(req.body.password, 10);

    const user = await User.create({
      ...req.body,
      password: hashedPassword,
    });
    const token = jwt.sign({ id: user._id }, "banThayDat", {
      expiresIn: "1d",
    });
    user.password = undefined;
    return res.status(201).json({
      message: "Tạo tài khoản thành công",
      acctoken: token,
      user,
    });
  } catch (error) {}
};
// bước 1: kiểm tra xem user có hợp lệ không
// bước 2: kiểm tra email có tồn tại không
// bước 3: mã hóa mật khẩu khi tạo user mới bằng bcrypt
// bước 4: tạo user mới
// bước 5: tạo token cho user
// bước 6: trả về phía client

export const signin = async (req, res) => {
  try {
    // kiểm tra xem user có hợp lý không
    const { error } = signinSchema.validate(req.body, { abortEarly: false });
    if (error) {
      const errors = error.details.map((err) => err.message);

      return res.status(400).json({
        messages: errors,
      });
    }
    // kieemt tra email có tồn tại không
    const user = await User.findOne({ email: req.body.email });
    console.log(user);
    if (!user) {
      res.status(400).json({
        message: "Email không có tồn tại",
      });
    }
    // so sánh password client gửi lên với password trong db
    const isMatch = await bcrypt.compare(req.body.password, user.password);

    if (!isMatch) {
      req.status(400).json({
        message: "Sai mật khẩu",
      });
    }
    const token = jwt.sign({ id: user._id }, "banThayDat", {
      expiresIn: "1d",
    });
    console.log(token);
    user.password = undefined;
    return res.json({
      message: "Đăng nhập thành công",
      token: token,
      user,
    });
  } catch (error) {
    res.json({
      message: "nhu cc",
    });
  }
};
// bước 1: kiểm tra xem user có hợp lệ không
// bước 2: kiểm tra email có tồn tại không
// B2.1: So sánh password client với password trong db
// B3: Tạo token mới chứa id của user
// B4: Trả về client
