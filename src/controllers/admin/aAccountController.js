import userModel from "../../models/userModel.js";
import sgMail from "@sendgrid/mail";
import bcrypt from "bcryptjs";
import accountModel from "../../models/accountModel.js";
import sendMail from "../../middlewares/email.mdw.js";
const getUser = async (id) => {
  let users;
  let isActive;
  if (id === 2) {
    users = await userModel.getAllStudent();
    isActive = 2;
  } else if (id === 3) {
    users = await userModel.getAllTeacher();
    isActive = 3;
  } else {
    users = await userModel.getAllStudentAndTeacher();
    isActive = 1;
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
  return [isActive, users];
};
class AAccountController {
  async index(req, res) {
    const id = parseInt(req.query.id) || 1;

    const user = await getUser(id);
    const isActive = user[0];
    const users = user[1];
    console.log(isActive);
    res.render("vwAdmin/accounts", {
      isActive,
      users,
      layout: "admin",
    });
  }

  async add(req, res) {
    res.render("vwAdmin/accounts/addTeacher", {
      layout: "admin",
    });
  }
  async addTeacher(req, res) {
    const randomPassword = Math.random().toString(36).slice(-8);
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(randomPassword, salt);
    const teacher = {
      name: req.body.name,
      password: hash,
      email: req.body.email,
      permissionID: 3,
      img: "/images/teacherPicture/teacher.jpg",
    };
    let err_message_name, err_message_email;
    const check = (name, chec) => {
      if (name === chec) {
        err_message_name = `${name} was exist...`;
        return 0;
      }
      return 1;
    };
    const check1 = (name, chec) => {
      if (name === chec) {
        err_message_email = `${name} was exist...`;
        return 0;
      }
      return 1;
    };
    const nameTeacher = await accountModel.findByUsername(req.body.name);
    const emailTeacher = await accountModel.findByEmail(req.body.email);
    if (
      check(nameTeacher?.name, teacher.name) === 1 &&
      check1(emailTeacher?.email, teacher.email) === 1
    ) {
      const message = {
        to: req.body.email,
        from: {
          name: "SUN LIGHT",
          email: "manhtu2272002@gmail.com",
        },
        subject: `SEND ACCOUNT TEACHER`,
        text: "and easy to do anywhere, even with Node.js",
        html: `<div><strong>username:${req.body.name}</strong></div>
               <div><strong>password:${randomPassword}</strong></div>`,
      };
      let emailSend = await sendMail(message);
      // emailSend.then(async (val) => {
      //   console.log('Email sent')

      // })
      await accountModel.add(teacher);
      return res.redirect("back");
    } else {
      return res.render("vwAdmin/accounts/addTeacher", {
        layout: "admin",
        err_message_name,
        err_message_email,
      });
    }
  }
  async edit(req, res) {
    let idUser = req.query.id;
    const user1 = await accountModel.findById(idUser);

    const user = {
      id: req.query.id,
      name: req.body.name,
      email: req.body.email,
    };
    let err_message_name, err_message_email;
    const check = (name, chec) => {
      if (name === chec) {
        err_message_name = `${name} was exist...`;
        return 0;
      }
      return 1;
    };
    const check1 = (name, chec) => {
      if (name === chec) {
        err_message_email = `${name} was exist...`;
        return 0;
      }
      return 1;
    };
    const name = await accountModel.findByUsername(req.body.name);
    const email = await accountModel.findByEmail(req.body.email);
    if (
      (check(name?.name, user.name) === 1 || user1.name === user.name) &&
      (check1(email?.email, user.email) === 1 || user1.email === user.email)
    ) {
      await accountModel.update(user);
      return res.redirect("back");
    } else {
      user1.email === user.email
        ? (err_message_email = "")
        : (err_message_email = err_message_email);
      user1.name === user.name
        ? (err_message_name = "")
        : (err_message_name = err_message_name);
      const id = req.body.id || 1;
      const user = await getUser(id);
      const isActive = user[0];
      const users = user[1];
      return res.render("vwAdmin/accounts/index", {
        layout: "admin",
        users,
        isActive,
        idUser,
        email1: req.body.email,
        name1: req.body.name,
        err_message_name,
        err_message_email,
      });
    }
  }

  async delete(req, res) {
    await userModel.delete(req.query.id);
    res.redirect("back");
  }
  async deleteByCheckbox(req, res) {
    for (const idAccounts of req.body.idAccounts) {
      await userModel.delete(idAccounts);
    }
    res.redirect("back");
  }

  async active1(req, res) {
    const user = {
      id: req.query.id,
      isActive: 1,
    };
    await accountModel.updateActive(user);
    res.redirect("back");
  }
  async active0(req, res) {
    console.log("fgsdfsdfsd");
    console.log(req.query.id);
    const user = {
      id: req.query.id,
      isActive: 0,
    };
    await accountModel.updateActive(user);
    res.redirect("back");
  }
}

export default new AAccountController();
