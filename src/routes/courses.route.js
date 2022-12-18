import express from "express";
import courseController from "../controllers/CourseController.js";

const router = express.Router();

router.get("/", courseController.index);
router.get("/courseDetail", courseController.detail);
// router.get("/enrollCourse", CourseController.join);

export default router;
