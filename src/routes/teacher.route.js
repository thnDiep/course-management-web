import express from "express";
import tProfileController from "../controllers/teacher/tProfileController.js";
const router = express.Router();

router.get("/createCourse", (req, res) => {
  res.render("vwteacher/createCourse", {
    layout: "teacher",
  });
});
router.get("/profile", tProfileController.index);
export default router;
