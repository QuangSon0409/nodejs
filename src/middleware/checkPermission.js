import User from "../model/auth";
import jwt from "jsonwebtoken";
export const checkPermission = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(" ")[1];
  if (!authHeader) {
    res.status(400).json({
      message: "Ban chua dang nhap",
    });
  }

  jwt.verify(token, "banThayDat", async (error, payload) => {
    if (error) {
      if (error.name === "JsonWebTokenError") {
        return res.status(400).json({
          message: "Token không hợp lệ",
        });
      }
      if (error.name === "TokenExpiredError") {
        return res.status(400).json({
          message: "Token đã hết hạn",
        });
      }
    }
    const user = await User.findById(payload.id);
    console.log(user);
    if (user.role !== "admin") {
      return res.json({
        message: "bạn không thể thực hiện chức năng này",
      });
    }
    next();
  });
};

// Kiểm tra req.headers.authorization có tồn tại hay không?
// Kiểm tra token có hợp lệ hay không?
// Dựa vào token để lấy payload, so sánh với id của user trong db
// Kiểm tra xem quyền của user có đủ để thực hiện hành động hay không?
// Nếu có thì next(), không thì trả về lỗi
