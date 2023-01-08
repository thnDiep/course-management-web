import express from "express";
import HomeController from "../controllers/HomeController.js";
import ProfileController from "../controllers/user/ProfileController.js";
import auth from "../middlewares/auth.mdw.js";
import isUser from "../middlewares/isUser.mdw.js";

const router = express.Router();

// Lấy profile từ db
router.get("/profile", auth, isUser, ProfileController.index);
// Edit + Update profile
router.post("/profile", auth, isUser, ProfileController.updateProfile);
router.get("/:slug", (req, res) => res.render("404"));

router.get("/", HomeController.index);
// router.get("/:slug", HomeController.index);

export default router;
