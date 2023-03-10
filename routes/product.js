import express from "express";
import {
  createProduct,
  getAll,
  getOne,
  patchProduct,
} from "../controller/product";

const router = express.Router();

router.get("/api/products", getAll);

router.get("/api/products/:id", getOne);

router.post("/api/products", createProduct);

router.patch("/api/products/:id", patchProduct);
router.delete("/api/products/:id");

export default router;
