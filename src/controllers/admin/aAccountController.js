import userModel from "../../models/userModel.js";
import sgMail from "@sendgrid/mail"
import bcrypt from 'bcryptjs';
import accountModel from "../../models/accountModel.js";
class AAccountController {
  async index(req, res) {
    let users;
    const id = parseInt(req.query.id) || 1;
    if(id===2){
       users = await userModel.getAllStudent();
    }
    else if(id === 3 )
    {
       users = await userModel.getAllTeacher();
    }
    else
    {
       users = await userModel.getAllStudentAndTeacher();
    }
    for (const user of users) {
      if (user.permissionID === 3) {
        user.sumCourse = await userModel.getNumberCourseOfTeacher(user.id);
      }
      // if (user.permissionID === 2) {
      //   user.sumCourseStudent = await userModel.getNumberCourseOfStudent(user.id);
      // }
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
    console.log("---------------")
    for (const idAccounts of req.body.idAccounts) {
      console.log(idAccounts)
      await userModel.delete(idAccounts);
    }
    res.redirect("back");
  }

}

export default new AAccountController();
