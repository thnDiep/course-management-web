import profileUserModel from "../../models/profileUserModel.js";
import AccountController from "../AccountController.js";
class uProfileController {
  // GET categories list
  async index(req, res) {
    // console.log("HIIIIIIIIIIIIIIIIIIII")
    // console.log(req.session.authUser)
    // console.log("BARRRRRRRRRRRRRRRRRRRRRR")
    // console.log(res.locals.lcAuthUser.id)

    const [profiles] = await profileUserModel.getById(res.locals.lcAuthUser.id);
    const lesson_learned = await profileUserModel.getLessonLearning(res.locals.lcAuthUser.id);
    console.log("BARRRRRRRRRRRRRRRRRRRRRR")
    console.log(lesson_learned)
    const lesson_love = await profileUserModel.getWatchList(res.locals.lcAuthUser.id);
    res.render("profile", {
      profiles,
      lesson_learned,
      lesson_love,
    });
  }
}
export default new uProfileController();
