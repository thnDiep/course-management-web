import userModel from "../../models/userModel.js";
class AAccountController {
  async index(req, res) {
    const user = await userModel.getAllStudentAndTeacher();

    res.render("vwAdmin/accounts", {
      user,
      layout: "admin",
    });
  }
  async add(req, res) {
    res.render("vwAdmin/accounts/addTeacher", {
      layout: "admin",
    });
  }
}

export default new AAccountController();
