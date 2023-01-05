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
router.post("/categories/addChild", aCategoryController.storeChild);
// router.post("/categories/multiAdd", aCategoryController.multiStore);

// delete CATEGORY
router.delete("/categories", aCategoryController.delete);
router.post(
  "/categories/deleteByCheckbox",
  aCategoryController.deleteByCheckbox
);

// update CATEGORY
router.get("/categories/edit", aCategoryController.edit);

// show list CATEGORY
router.get("/categories", aCategoryController.index);

// delete COURSE
router.delete("/courses", aCourseController.delete);
router.post("/courses/deleteByCheckbox", aCourseController.deleteByCheckbox);

// show list COURSE
router.get("/courses", aCourseController.index);

router.get("/", aCategoryController.index);

// Accounts Management
router.get("/listAccount", aAccountController.index);
// Add teacher
router.get("/listAccount/addTeacher", aAccountController.add);
// delete Account
router.delete("/account", aAccountController.delete);
router.post(
  "/listAccount/deleteByCheckbox",
  aAccountController.deleteByCheckbox
);
// add Teacher
router.post("/listAccount/add", aAccountController.addTeacher);

export default router;
