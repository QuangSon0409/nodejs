import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  name: { type: String },
  price: { type: String },
  categoryId: {
    type: mongoose.Types.ObjectId,
    ref: "Category",
  },
});

export default mongoose.model("Product", productSchema);
