import express from "express";
import HomeController from "../controllers/HomeController.js";
import ProfileController from "../controllers/user/ProfileController.js";
import accountRoute from "./account.route.js";

const router = express.Router();

router.get("/", HomeController.index);

// function restrict (req,res,next){
//       if(!req.session.isAuthenticated){
//         return res.redirect("/login");
//       }
//       next();
// }
//router.get("/profile",restrict, ProfileController.index);
router.get("/profile", ProfileController.index);


router.use("/",accountRoute);


export default router;
