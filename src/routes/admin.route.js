import express from "express";

import aCategoryController from "../controllers/admin/aCategoryController.js";
import aCourseController from "../controllers/admin/aCourseController.js";
const router = express.Router();

// CATEGORIES MANAGEMENENT
router.get("/categories/update", aCategoryController.update);
router.get("/categories/del", aCategoryController.delete);

router.get("/categories/add", aCategoryController.add);
router.post("/categories/add", aCategoryController.addPost);

router.get("/categories", aCategoryController.index);

// COURSES MANAGEMENT
router.get("/courses", aCourseController.index);

router.get("/", aCategoryController.index);

export default router;
