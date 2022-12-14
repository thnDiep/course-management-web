import express from "express";

import adminController from "../controllers/AdminController.js";
const router = express.Router();

// CATEGORIES MANAGEMENENT
router.get("/categories/update", adminController.categoriesUpdate);
router.get("/categories/add", adminController.categoriesAdd);
router.get("/categories", adminController.categories);
router.post("/categories", adminController.categories);

// COURSES MANAGEMENT
router.get("/courses", adminController.courses);

router.get("/", adminController.index);

export default router;
