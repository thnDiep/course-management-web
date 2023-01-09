import express from "express";
import isAdmin from "../middlewares/isAdmin.mdw.js";
import auth from "../middlewares/auth.mdw.js";
import aCategoryController from "../controllers/admin/aCategoryController.js";
import aCourseController from "../controllers/admin/aCourseController.js";
import aAccountController from "../controllers/admin/aAccountController.js";
const router = express.Router();

// add CATEGORY
router.get("/categories/add", auth, isAdmin, aCategoryController.add);
router.get(
  "/categories/add/is-available",
  auth,
  isAdmin,
  aCategoryController.isAvailableToAdd
);
router.post("/categories/add", auth, isAdmin, aCategoryController.store);
router.post(
  "/categories/addChild",
  auth,
  isAdmin,
  aCategoryController.storeChild
);
router.post(
  "/categories/multi-add",
  auth,
  isAdmin,
  aCategoryController.multiStore
);

// delete CATEGORY
router.delete("/categories", auth, isAdmin, aCategoryController.delete);
router.post(
  "/categories/deleteByCheckbox",
  auth,
  isAdmin,
  aCategoryController.deleteByCheckbox
);

// update CATEGORY
router.get("/categories/edit", auth, isAdmin, aCategoryController.edit);
router.put("/categories/edit", auth, isAdmin, aCategoryController.update);

// show list CATEGORY
router.get("/categories", auth, isAdmin, aCategoryController.index);

// delete COURSE
router.delete("/courses", auth, isAdmin, aCourseController.delete);
router.post(
  "/courses/deleteByCheckbox",
  auth,
  isAdmin,
  aCourseController.deleteByCheckbox
);

// show list COURSE
router.put("/courses/block", auth, isAdmin, aCourseController.blocked);
router.get("/courses", auth, isAdmin, aCourseController.index);

router.get("/", auth, isAdmin, aCategoryController.index);

// Accounts Management
router.get("/listAccount", auth, isAdmin, aAccountController.index);
// Add teacher
router.get("/listAccount/addTeacher", auth, isAdmin, aAccountController.add);
// delete Account
router.delete("/account", auth, isAdmin, aAccountController.delete);
router.post(
  "/listAccount/deleteByCheckbox",
  auth,
  isAdmin,
  aAccountController.deleteByCheckbox
);
// edit Account
router.put("/listAccount/edit", auth, isAdmin, aAccountController.edit);

// add Teacher
router.post("/listAccount/add", auth, isAdmin, aAccountController.addTeacher);

// acitve
router.put("/account/active1", auth, isAdmin, aAccountController.active1);
router.put("/account/active0", auth, isAdmin, aAccountController.active0);

export default router;
