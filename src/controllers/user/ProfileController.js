import profileUserModel from "../../models/profileUserModel.js";
import AccountController from "../AccountController.js";
import bcrypt from "bcryptjs";
import courseModel from "../../models/courseModel.js";
import accountModel from "../../models/accountModel.js";
import { searchOptions } from "../CourseController.js";
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
      searchOptions,
      isProfile,
      profiles,
      lesson_learned,
      lesson_love,
    });
  }
  async getLearning(req, res) {
    const learning = await profileUserModel.getLessonLearning(29);
    for (let i = 0; i < learning.length; i++) {
      const rated = await courseModel.getAvgRate(learning[i].id);
      learning[i].rated = (+rated).toFixed(1);
    }
    const isLearning = true;
    res.render("learningCourses", {
      searchOptions,
      isLearning,
      learning,
    });
  }
  async getWatchList(req, res) {
    const lesson_love = await profileUserModel.getWatchList(29);
    for (let i = 0; i < lesson_love.length; i++) {
      const rated = await courseModel.getAvgRate(lesson_love[i].id);
      lesson_love[i].rated = (+rated).toFixed(1);
    }
    res.render("watchList", {
      searchOptions,
      lesson_love,
    });
  }
  async updateProfile(req, res) {
    const ret = bcrypt.compareSync(
      req.body.password,
      res.locals.lcAuthUser.password
    );
    const [profiles] = await profileUserModel.getById(res.locals.lcAuthUser.id);
    const lesson_learned = await profileUserModel.getLessonLearning(
      res.locals.lcAuthUser.id
    );
    const lesson_love = await profileUserModel.getWatchList(
      res.locals.lcAuthUser.id
    );
    const isProfile = true;
    if (ret) {
      const salt = bcrypt.genSaltSync(10);
      const hash = bcrypt.hashSync(req.body.newPassword, salt);
      const user = {
        id: res.locals.lcAuthUser.id,
        name: req.body.name,
        email: req.body.email,
        password: hash,
      };

      let err_message_name, err_message_email, err_message;
      const check = (name, check, i) => {
        if (name === check) {
          i === 0
            ? (err_message_name = `${name} was exist...`)
            : (err_message_email = `${name} was exist...`);
          return 0;
        }
        return 1;
      };
      const userAvailable = await accountModel.findByUsername(req.body.name);
      const emailAvailable = await accountModel.findByEmail(req.body.email);
      console.log(profiles.name);
      // profile = res.locals.lcAuthUser
      if (
        (check(userAvailable?.name, user.name, 0) === 1 ||
          user.name === profiles.name) &&
        (check(emailAvailable?.email, user.email, 1) === 1 ||
          user.email === profiles.email)
      ) {
        await profileUserModel.updateUser(user);
        res.locals.lcAuthUser.email = user.email;
        res.locals.lcAuthUser.name = user.name;
        res.locals.lcAuthUser.password = user.password;

        return res.redirect("/profile");
      } else {
        return res.render("profile", {
          // layout: false,
          searchOptions,
          isProfile,
          profiles,
          lesson_learned,
          lesson_love,
          err_message_name,
          err_message_email,
        });
      }
    } else {
      return res.render("profile", {
        err_message_password: "Password is not correct...",
        searchOptions,
        isProfile,
        profiles,
        lesson_learned,
        lesson_love,
      });
    }
  }
}
export default new uProfileController();
