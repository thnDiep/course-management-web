import express from "express";
import HomeController from "../controllers/HomeController.js";
import ProfileController from "../controllers/user/ProfileController.js";
import accountRoute from "./account.route.js";
import auth from "../middlewares/auth.mdw.js";
import isUser from "../middlewares/isUser.mdw.js";

const router = express.Router();

router.get("/", HomeController.index);
// Lấy profile từ db
router.get("/profile", auth, isUser, ProfileController.index);
// Edit + Update profile
router.post("/profile", auth, isUser, ProfileController.updateProfile);

router.use("/", accountRoute);

export default router;
