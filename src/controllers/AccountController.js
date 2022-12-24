import accountModel from "../models/accountModel.js";
import bcrypt from 'bcryptjs';
class AccountController {
  async index(req, res) {
    const rawPassword = req.body.password;
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(rawPassword, salt);
    console.log(hash)
    const user = {
        name: req.body.name,
        password: hash,
        email: req.body.email,
        permissionID: 2
      }
    console.log(user.password)
      let err_message_name, err_message_email;
      const check = (name, chec)=>{
         if(name===chec){
           err_message_name =`${name} was exist...`
           return 0;
         }
         return 1;
      }
      const userAvailable = await accountModel.findByUsername(req.body.name)
      const emailAvailable = await accountModel.findByEmail(req.body.email)
      if(check(userAvailable?.name, user.name)===1&&check(emailAvailable?.email, user.email)===1)
      {

         await accountModel.add(user);
         return res.redirect("back")
      }
      else{
          if(check(userAvailable?.name,user.name)==0 || check(emailAvailable?.email,user.email)==0){
            return res.render('signUp',{
              // layout: false,
              err_message_name,
              err_message_email,
            });
          }
      }
    }
  async index2(req, res) {
      const [passAvailable] = await accountModel.findByEmailToCheckPassword(req.body.email)
      const ret = bcrypt.compareSync(req.body.password, passAvailable.password)
      console.log(passAvailable.password)
      console.log(ret)
      if(ret)
      {
          return res.redirect("/")
      }
      else{
        return res.render('login',{
          err_message_name: "Password was wrong...",
        });
      }
    }
}

export default new AccountController();
