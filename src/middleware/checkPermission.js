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

  jwt.verify(token, "banThayDat", async (err, payload) => {
    const user = await User.findById(payload.id);
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
