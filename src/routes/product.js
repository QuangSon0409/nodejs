import express from "express";
import {
  createProduct,
  getAll,
  getOne,
  patchProduct,
  removeProduct,
} from "../controllers/product";

const router = express.Router();

router.get("/products", getAll);

router.get("/products/:id", getOne);

router.post("/products", createProduct);

router.patch("/products/:id", patchProduct);
router.delete("/products/:id", removeProduct);

export default router;
