import userModel from "../../models/userModel.js";
class AAccountController {
  async index(req, res) {
    const users = await userModel.getAllStudentAndTeacher();
    for (const user of users) {
      if (user.permissionID === 3) {
        user.sumCourse = await userModel.getNumberCourseOfTeacher(user.id);
        console.log(users[1].sumCourse)
      }
      // else {
      //   user.sumCourse = 0;
      // }
    }
    res.render("vwAdmin/accounts", {
      users,
      layout: "admin",
    });
  }
  async add(req, res) {
    res.render("vwAdmin/accounts/addTeacher", {
      layout: "admin",
    });
  }
  async delete(req, res) {
    await userModel.delete(req.query.id);
    res.redirect("back");
  }
  async deleteByCheckbox(req, res) {
    console.log(req.body)
    for (const idAccounts of req.body.idAccounts) {
      await userModel.delete(idAccounts);
    }
    res.redirect("back");
  }

}

export default new AAccountController();
