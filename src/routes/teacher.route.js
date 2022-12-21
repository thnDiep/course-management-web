import express from "express";
import tCourseController from "../controllers/teacher/tCourseController.js";
import tProfileController from "../controllers/teacher/tProfileController.js";

const router = express.Router();

router.get("/profile", tProfileController.index);

router.get("/createCourse", tCourseController.index);
router.get("/createLesson", (req, res) => {
  res.render("vwteacher/createLesson", {
    layout: "teacher",
  });
});
export default router;
