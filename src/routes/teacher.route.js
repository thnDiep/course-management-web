import express from "express";

const router = express.Router();

router.get("/createCourse", (req, res) => {
  res.render("vwteacher/createCourse", {
    layout: "teacher",
  });
});
router.get("/profile", (req, res) => {
  res.render("vwteacher/teacherProfile", {
    layout: "teacher",
  });
});
export default router;
