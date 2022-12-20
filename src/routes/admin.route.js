import express from "express";

import aCategoryController from "../controllers/admin/aCategoryController.js";
import aCourseController from "../controllers/admin/aCourseController.js";
import aAccountController from "../controllers/admin/AccountController.js";
const router = express.Router();

// CATEGORIES MANAGEMENENT
router.get("/categories/add", aCategoryController.add);
router.get(
  "/categories/add/is-available",
  aCategoryController.isAvailableToAdd
);
router.post("/categories/add", aCategoryController.store);

router.delete("/categories", aCategoryController.delete);
router.get("/categories/update", aCategoryController.update);

router.get("/categories", aCategoryController.index);

// Accounts Management
router.get("/listAccount", aAccountController.index);

// COURSES MANAGEMENT
router.get("/courses", aCourseController.index);

router.get("/", aCategoryController.index);

export default router;
