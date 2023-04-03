import Category from "../model/category";
import Product from "../model/products";

export const getAll = async (req, res) => {
  try {
    const categories = await Category.find({});
    if (categories.length === 0) {
      res.status(404).json({
        message: "Không có danh mục nào",
      });
    }
    return res.status(200).json(categories);
  } catch (error) {
    return res.status(500).json({
      message: error,
    });
  }
};
export const getOne = async (req, res) => {
  try {
    const category = await Category.findById(req.params.id).populate(
      "products"
    );
    if (category.length === 0) {
      res.status(404).json({
        message: "Không có sản phẩm nào",
      });
    }
    console.log(category);
    return res.status(200).json(category);
  } catch (error) {
    return res.status(500).json({
      message: error,
    });
  }
};
export const create = async (req, res) => {
  // req.body -> lấy giá trị (objet) từ client gửi lên
  try {
    // const { data: product } = await axios.post(
    //   `http://localhost:3001/product`,
    //   req.body
    // );
    const category = await Category.create(req.body);
    if (category.length === 0) {
      res.status(404).json({
        message: "Không có sản phẩm nào",
      });
    }
    return res.status(201).json({
      message: "tạo danh mục thành công",
      data: category,
    });
  } catch (error) {
    return res.status(500).json({
      message: error,
    });
  }
};
export const patch = async (req, res) => {
  try {
    const category = await Category.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    // console.log(category);
    if (category.length === 0) {
      res.status(404).json({
        message: "Không có danh mục nào",
      });
    }
    return res.status(200).json({
      message: "sửa danh mục thành công",
      data: category,
    });
  } catch (error) {
    return res.status(500).json({
      message: error,
    });
  }
};

export const remove = async (req, res) => {
  try {
    await Category.findOneAndDelete({ _id: req.params.id });
    res.status(200).json({
      message: "xóa danh mục thành công",
    });
  } catch (error) {
    return res.status(500).json({
      message: error,
    });
  }
};
