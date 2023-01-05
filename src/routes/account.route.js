import express from "express";
import AccountController from "../controllers/AccountController.js";
const router = express.Router();

router.get("/login", (req, res) => {
  res.render("login");
});
router.post("/login", AccountController.login);

router.get("/signup", function (req, res) {
  res.render("signUp");
});
router.post("/signup", AccountController.signUp);

router.get("/signup/otp", AccountController.otp);
export default router;
