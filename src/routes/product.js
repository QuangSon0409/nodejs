import express from "express";
import {
  createProduct,
  getAll,
  getOne,
  patchProduct,
  removeProduct,
} from "../controllers/product";
import { checkPermission } from "../middleware/checkPermission";

const router = express.Router();

router.get("/products", getAll);

router.get("/products/:id", getOne);

router.post("/products", checkPermission, createProduct);

router.patch("/products/:id", checkPermission, patchProduct);
router.delete("/products/:id", checkPermission, removeProduct);

export default router;
