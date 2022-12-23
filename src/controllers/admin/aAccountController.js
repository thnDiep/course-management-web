import userModel from "../../models/userModel.js";
import sgMail from "@sendgrid/mail"
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
  async addTeacher(req,res){
    const API_KEY = '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'
    sgMail.setApiKey(API_KEY)
    const randomstring = Math.random().toString(36).slice(-8);
    console.log(randomstring)

    const message = {
      to: req.body.email,
      from: {
        name: 'SUN LIGHT',
        email: 'manhtu2272002@gmail.com',
      },
      subject:`SEND ACCOUNT TEACHER`,
      text: 'and easy to do anywhere, even with Node.js',
      html: `<div><strong>username:${req.body.name}</strong></div>
             <div><strong>password:${req.body.password}</strong></div>`,
    }
    sgMail
    .send(message)
    .then(() => {
      console.log('Email sent')
    })
    .catch((error) => {
      console.error(error)
    })
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
