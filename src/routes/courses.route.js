import express from "express";
import courseController from "../controllers/CourseController.js";

const router = express.Router();

router.get("/", courseController.index);

router.get("/courseDetail", (req, res) => {
  res.render("courseDetail");
});

router.get("/enrollCourse", (req, res) => {
  res.render("enrollCourse");
});

export default router;
