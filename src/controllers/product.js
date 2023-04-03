import axios from "axios";
import Product from "../model/products";
import category from "../model/category";

export const getAll = async (req, res) => {
  const {
    _page = 1,
    _sort = "createAt",
    _order = "asc",
    _limit = 10,
  } = req.query;
  const options = {
    page: _page,
    limit: _limit,
    [_sort]: _order === "desc" ? -1 : 1,
  };
  try {
    const { docs: products } = await Product.paginate({}, options);
    if (products.length === 0) {
      res.status(404).json({
        message: "Không có sản phẩm nào",
      });
    }
    return res.status(200).json(products);
  } catch (error) {
    return res.status(500).json({
      message: error,
    });
  }
};
export const getOne = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id).populate(
      "categoryId"
    );
    if (product.length === 0) {
      res.status(404).json({
        message: "Không có sản phẩm nào",
      });
    }
    return res.status(200).json(product);
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
    await category.findByIdAndUpdate(product.categoryId, {
      $addToSet: {
        products: product._id,
      },
    });
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
