import profileUserModel from "../../models/profileUserModel.js";
class uProfileController {
  // GET categories list
  async index(req, res) {
    console.log(req.session.authUser)
    const [profiles] = await profileUserModel.getById(1);
    const lesson_learned = await profileUserModel.getLessonLearning(1);
    const lesson_love = await profileUserModel.getWatchList(1);
    res.render("profile", {
      profiles,
      lesson_learned,
      lesson_love,
    });
  }
}
export default new uProfileController();
