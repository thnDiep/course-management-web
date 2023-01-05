import accountModel from "../models/accountModel.js";
import bcrypt from "bcryptjs";
class AccountController {
  async signUp(req, res) {
    const rawPassword = req.body.password;
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(rawPassword, salt);
    const user = {
      name: req.body.name,
      password: hash,
      email: req.body.email,
      permissionID: 2,
    };
    let err_message_name, err_message_email,err_message;
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
      await accountModel.add(user);
      return res.redirect("back");
    } else {
      if (check(userAvailable?.name, user.name) == 0 || check(emailAvailable?.email, user.email) == 0) {
        if(check(userAvailable?.name, user.name) == 0){
          return res.render("signUp", {
          // layout: false,
          err_message_name: err_message,
        });}
        else{
          return res.render("signUp", {
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
      else{
        return 1;
      }
    };
    const emailAvailable = await accountModel.findByEmail(req.body.email);
    if (check(emailAvailable?.email, req.body.email) == 1) {
      return res.render("login", {
        err_message:"Email & password is not correct...",
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
          if(emailAvailable.permissionID==2)
          {
            req.session.isStudent = true;
            req.session.authUser = emailAvailable;
            return res.redirect("/");
          }
          else if(emailAvailable.permissionID==3)
          {
            req.session.isTeacher = true;
            req.session.authTeacher = emailAvailable;
            return res.redirect("/teacher/profile");
          }
          else if(emailAvailable.permissionID==1)
          {
            req.session.isAdmin = true;
            req.session.authAdmin = emailAvailable;
            return res.redirect("/admin/listAccount");
          }
        } else {
          return res.render("login", {
            err_message:"Email & password is not correct...",
          });
        }
      }
    }
  }
  async otp (req,res){
    return res.render("otp", {
    });
  }

}

export default new AccountController();
