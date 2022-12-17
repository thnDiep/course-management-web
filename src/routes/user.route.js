import express from "express";
import uProfileController from "../controllers/user/ProfileController.js";

const router = express.Router();

router.get("/", (req, res) => {
  res.render("home", {
    check: true,
  });
});

router.get("/profile", uProfileController.index);
router.get("/teacherProfile", (req, res) => {
  res.render("teacherProfile", {
    check: false,
  });
});
router.get("/listAccount", (req, res) => {
  res.render("listAccount", {
    check: false,
  });
});

router.get("/createCourse", (req, res) => {
  res.render("createCourse", {
    check: false,
  });
});

router.get("/courses/courseDetail", (req, res) => {
  res.render("courseDetail");
});
export default router;
