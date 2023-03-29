import axios from "axios";
import Product from "../model/products";

export const getAll = async (req, res) => {
  try {
    const products = await Product.find({});
    if (products.length === 0) {
      res.status(404).json({
        message: "Không có sản phẩm nào",
      });
    }
    return res.status(200).json({
      message: "product get all",
      data: products,
    });
  } catch (error) {
    return res.status(500).json({
      message: error,
    });
  }
};
export const getOne = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (product.length === 0) {
      res.status(404).json({
        message: "Không có sản phẩm nào",
      });
    }
    return res.status(200).json({
      message: "product get id",
      data: product,
    });
  } catch (error) {
    return res.status(500).json({
      message: error,
    });
  }
};
export const createProduct = async (req, res) => {
  // req.body -> lấy giá trị (objet) từ client gửi lên
  try {
    // const { data: product } = await axios.post(
    //   `http://localhost:3001/product`,
    //   req.body
    // );
    const product = await Product.create(req.body);
    if (product.length === 0) {
      res.status(404).json({
        message: "Không có sản phẩm nào",
      });
    }
    return res.status(201).json({
      message: "Product created",
      data: product,
    });
  } catch (error) {
    return res.status(500).json({
      message: error,
    });
  }
};
export const patchProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (product.length === 0) {
      res.status(404).json({
        message: "Không có sản phẩm nào",
      });
    }
    return res.status(200).json({
      message: "sửa sản phầm thành công",
      data: product,
    });
  } catch (error) {
    return res.status(500).json({
      message: error,
    });
  }
};

export const removeProduct = async (req, res) => {
  try {
    await Product.findOneAndDelete({ _id: req.params.id });
    res.status(200).json({
      message: "product delete",
    });
  } catch (error) {
    return res.status(500).json({
      message: error,
    });
  }
};
