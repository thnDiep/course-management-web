import accountModel from "../models/accountModel.js";
import bcrypt from "bcryptjs";
import sendMail from "../middlewares/email.mdw.js"
let OTP;
let user;
function generateOTP() {

  // Declare a digits variable 
  // which stores all digits
  let OTP = "";
  var digits = '0123456789';
  for (let i = 0; i < 4; i++) {
    OTP += digits[Math.floor(Math.random() * 10)];
  }
  return OTP;
}
class AccountController {

  async signUp(req, res) {
    const rawPassword = req.body.password;
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(rawPassword, salt);
    user = {
      name: req.body.name,
      password: hash,
      email: req.body.email,
      permissionID: 2,
    };
    let err_message_name, err_message_email, err_message;
    const check = (name, check) => {
      if (name === check) {
        err_message = `${name} was exist...`;
        return 0;
      }
      return 1;
    };
    const userAvailable = await accountModel.findByUsername(req.body.name);
    const emailAvailable = await accountModel.findByEmail(req.body.email);
    // Đem check tên đã đc tìm trong db vs tên user vừa req lên
    if (
      check(userAvailable?.name, user.name) === 1 &&
      check(emailAvailable?.email, user.email) === 1
    ) {
      OTP = generateOTP();
      const message = {
        to: user.email,
        from: {
          name: 'SUN LIGHT',
          email: 'manhtu2002227@gmail.com',
        },
        subject: `SEND OTP Student`,
        text: 'and easy to do anywhere, even with Node.js',
        html: `<div><strong>OTP:${OTP}</strong></div>`,
      }
      console.log("hello2232")

      let emailSend = await sendMail(message)
      // res.status(200).send(emailSend);
      console.log("hello")
      return res.render("otp", {
        layout: false,
      });
      // return res.redirect("back");
    } else {
      if (check(userAvailable?.name, user.name) == 0 || check(emailAvailable?.email, user.email) == 0) {
        if (check(userAvailable?.name, user.name) == 0) {
          return res.render("signUp", {
            layout: false,
            err_message_name: err_message,
          });
        }
        else {
          return res.render("signUp", {
            layout: false,
            err_message_email: err_message,
          });
        }
      }
    }
  }
  async login(req, res) {

    const check = (name, chec) => {
      if (name === chec) {
        return 0;
      }
      else {
        return 1;
      }
    };
    const emailAvailable = await accountModel.findByEmail(req.body.email);
    if (check(emailAvailable?.email, req.body.email) == 1) {
      return res.render("login", {
        layout: false,
        err_message: "Email & password is not correct...",
      });
    } else {
      if (check(emailAvailable?.email, req.body.email) == 0) {
        // Đúng email rồi so sánh password
        const [passAvailable] = await accountModel.findByEmailToCheckPassword(
          req.body.email
        );
        const ret = bcrypt.compareSync(
          req.body.password,
          passAvailable.password
        );
        if (ret) {
          req.session.isAuthenticated = true;
          // Xét quyền của 3 vai trò
          if (emailAvailable.permissionID == 2) {
            req.session.isStudent = true;
            req.session.authUser = emailAvailable;
            return res.redirect("/");
          }
          else if (emailAvailable.permissionID == 3) {
            req.session.isTeacher = true;
            req.session.authTeacher = emailAvailable;
            return res.redirect("/teacher/profile");
          }
          else if (emailAvailable.permissionID == 1) {
            req.session.isAdmin = true;
            req.session.authAdmin = emailAvailable;
            return res.redirect("/admin/listAccount");
          }
        } else {
          return res.render("login", {
            layout: false,
            err_message: "Email & password is not correct...",
          });
        }
      }
    }
  }
  async otp(req, res) {
    const otpv = req.body.input1 + req.body.input2 + req.body.input3 + req.body.input4;
    if (otpv === OTP) {

      await accountModel.add(user);
      res.redirect("/login");
    }
    else {
      return res.render("otp", {
        layout: false,
        err_message: "OTP is not correct",
        input1: req.body.input1,
        input2: req.body.input2,
        input3: req.body.input3,
        input4: req.body.input4,
      });

    }
  }

}

export default new AccountController();
