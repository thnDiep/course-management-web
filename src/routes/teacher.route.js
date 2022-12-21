import express from "express";
import tCourseController from "../controllers/teacher/tCourseController.js";

const router = express.Router();


router.get("/profile", (req, res) => {
  res.render("vwteacher/teacherProfile", {
    layout: "teacher",
  });
});
router.get("/createCourse", tCourseController.index);
router.get("/createLesson", (req, res) => {
  res.render("vwteacher/createLesson", {
    layout: "teacher",
  });
});
export default router;
