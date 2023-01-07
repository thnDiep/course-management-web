import express from "express";
import AccountController from "../controllers/AccountController.js";
import auth from "../middlewares/auth.mdw.js";

const router = express.Router();
import { searchOptions } from "../controllers/CourseController.js";
router.get("/login", (req, res) => {
  res.render("login", {
    searchOptions,
    layout: false,
  });
});
router.post("/login", AccountController.login);

router.get("/signup", function (req, res) {
  res.render("signUp", {
    searchOptions,
    layout: false,
  });
});
router.post("/signup", AccountController.signUp);

router.post("/signup/otp", AccountController.otp);
router.get("/logout", AccountController.logout);
export default router;
