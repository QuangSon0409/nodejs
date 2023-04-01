import express from "express";
import { create, getAll, getOne, patch, remove } from "../controllers/category";
import { checkPermission } from "../middleware/checkPermission";

const router = express.Router();

router.get("/categories", getAll);

router.get("/categories/:id", getOne);

router.post("/categories", checkPermission, create);

router.patch("/categories/:id", checkPermission, patch);
router.delete("/categories/:id", checkPermission, remove);

export default router;
