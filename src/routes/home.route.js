import express from "express";
import HomeController from "../controllers/HomeController.js";
import ProfileController from "../controllers/user/ProfileController.js";
import accountRoute from "./account.route.js";

const router = express.Router();

router.get("/", HomeController.index);

router.get("/profile", ProfileController.index);

router.use("/",accountRoute);
// router.get("/courses/courseDetail", courseDetailController.index);
// Routes

export default router;
