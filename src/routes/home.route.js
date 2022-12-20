import express from "express";
import HomeController from "../controllers/HomeController.js";
import tCourseController from "../controllers/teacher/tCourseController.js";
import ProfileController from "../controllers/user/ProfileController.js";

const router = express.Router();

router.get("/", HomeController.index);

router.get("/profile", ProfileController.index);

router.get("/createCourse", tCourseController.index);
// router.get("/courses/courseDetail", courseDetailController.index);
// Routes
router.get("/login", (req, res) => {
  res.render("login");
});

router.get("/signup", (req, res) => {
  res.render("signUp");
});
export default router;
