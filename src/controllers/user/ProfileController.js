import profileUserModel from "../../models/profileUserModel.js";
import AccountController from "../AccountController.js";
import bcrypt from "bcryptjs";
import courseModel from "../../models/courseModel.js";
class uProfileController {
  // GET categories list
  async index(req, res) {
    const [profiles] = await profileUserModel.getById(res.locals.lcAuthUser.id);
    const lesson_learned = await profileUserModel.getLessonLearning(
      res.locals.lcAuthUser.id
    );
    const lesson_love = await profileUserModel.getWatchList(
      res.locals.lcAuthUser.id
    );
    const isProfile = true;
    res.render("profile", {
      isProfile,
      profiles,
      lesson_learned,
      lesson_love,
    });
  }
  async getLearning(req, res) {
    const learning = await profileUserModel.getLessonLearning(
      res.locals.lcAuthUser.id
    );
    for (let i = 0; i < learning.length; i++) {
      const rated = await courseModel.getAvgRate(learning[i].id);
      learning[i].rated = (+rated).toFixed(1);
    }
    const isLearning = true;
    res.render("learningCourses", {
      isLearning,
      learning,
    });
  }
  async getWatchList(req, res) {
    const lesson_love = await profileUserModel.getWatchList(
      res.locals.lcAuthUser.id
    );
    for (let i = 0; i < lesson_love.length; i++) {
      const rated = await courseModel.getAvgRate(lesson_love[i].id);
      lesson_love[i].rated = (+rated).toFixed(1);
    }
    res.render("watchList", {
      lesson_love,
    });
  }
  async updateProfile(req, res) {
    const student = profileUserModel.getById(res.locals.lcAuthUser.id);
    console.log("HIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIII");
    console.log(res.locals.lcAuthUser);

    const ret = bcrypt.compareSync(
      req.body.password,
      res.locals.lcAuthUser.password
    );
    console.log(ret);

    if (ret) {
      const salt = bcrypt.genSaltSync(10);
      const hash = bcrypt.hashSync(req.body.newPassword, salt);
      const user = {
        id: res.locals.lcAuthUser.id,
        name: req.body.name,
        email: req.body.email,
        password: hash,
      };
      await profileUserModel.updateUser(user);
      return res.redirect("/login");
    } else {
      const [profiles] = await profileUserModel.getById(
        res.locals.lcAuthUser.id
      );
      const lesson_learned = await profileUserModel.getLessonLearning(
        res.locals.lcAuthUser.id
      );
      const lesson_love = await profileUserModel.getWatchList(
        res.locals.lcAuthUser.id
      );
      const isProfile = true;
      return res.render("profile", {
        err_message_password: "Password is not correct...",
        isProfile,
        profiles,
        lesson_learned,
        lesson_love,
      });
    }
  }
}
export default new uProfileController();
