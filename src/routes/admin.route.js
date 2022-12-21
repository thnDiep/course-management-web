import express from "express";

import aCategoryController from "../controllers/admin/aCategoryController.js";
import aCourseController from "../controllers/admin/aCourseController.js";
import aAccountController from "../controllers/admin/aAccountController.js";
const router = express.Router();

// add CATEGORY
router.get("/categories/add", aCategoryController.add);
router.get(
  "/categories/add/is-available",
  aCategoryController.isAvailableToAdd
);
router.post("/categories/add", aCategoryController.store);

// delete CATEGORY
router.delete("/categories", aCategoryController.delete);

// update CATEGORY
router.get("/categories/edit", aCategoryController.edit);

// show list CATEGORY
router.get("/categories", aCategoryController.index);

// delete COURSE
router.delete("/courses", aCourseController.delete);

// show list COURSE
router.get("/courses", aCourseController.index);

router.get("/", aCategoryController.index);

// Accounts Management
router.get("/listAccount", aAccountController.index);
// Add teacher
router.get("/listAccount/addTeacher", aAccountController.add);

export default router;
