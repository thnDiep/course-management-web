import express from "express";
import AccountController from "../controllers/AccountController.js";
const router = express.Router();

router.get("/login", (req, res) => {
  res.render("login", {
    layout: false,
  });
});
router.post("/login", AccountController.login);

router.get("/signup", function (req, res) {
  res.render("signUp", {
    layout: false,

  });
});
router.post("/signup", AccountController.signUp);

router.post("/signup/otp", AccountController.otp);
export default router;
