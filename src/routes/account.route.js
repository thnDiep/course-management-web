import express from "express";
import AccountController from "../controllers/AccountController.js";
const router = express.Router();

router.get("/login", (req, res) => {
  res.render("login");
});
router.post("/login", AccountController.index2)

// function restrict (req,res,next){
//   if(req.session.isAuthenticated){
//     return res.redirect("/login");
//   }
//   next();
// }
// router.get("/profile",async function(req,res){
//   console.log("This is"+req.session.authUser)
// res.render("/profile");
// })

router.get("/signup", function (req, res) {
    res.render('signUp');
  });
router.post("/signup", AccountController.index)
export default router;
