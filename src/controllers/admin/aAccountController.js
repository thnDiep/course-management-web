import userModel from "../../models/userModel.js";
import sgMail from "@sendgrid/mail"
import bcrypt from 'bcryptjs';
import accountModel from "../../models/accountModel.js";
import * as dotenv from 'dotenv'
dotenv.config()
import express from 'express'
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
    console.log(process.env.SENDGRID_API_KEY)
    sgMail.setApiKey(process.env.SENDGRID_API_KEY)
    const randomPassword = Math.random().toString(36).slice(-8);
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(randomPassword, salt);
    const teacher = {
      name: req.body.name,
      password: hash,
      email: req.body.email,
      permissionID: 3,
    }
    let err_message_name, err_message_email;
    const check = (name, chec)=>{
        if(name===chec){
          err_message_name =`${name} was exist...`
          return 0;
        }
        return 1;
    }
    const check1 = (name, chec)=>{
      if(name===chec){
        err_message_email =`${name} was exist...`
        return 0;
      }
      return 1;
  }
    const nameTeacher = await accountModel.findByUsername(req.body.name)
    const emailTeacher = await accountModel.findByEmail(req.body.email)
    if(check(nameTeacher?.name,teacher.name)===1&&check1(emailTeacher?.email,teacher.email)===1){
      const message = {    
        to: req.body.email,
        from: {
          name: 'SUN LIGHT',
          email: 'manhtu2272002@gmail.com',
        },
        subject:`SEND ACCOUNT TEACHER`,
        text: 'and easy to do anywhere, even with Node.js',
        html: `<div><strong>username:${req.body.name}</strong></div>
               <div><strong>password:${randomPassword}</strong></div>`,
      }
      sgMail
      .send(message)
      .then(() => {
        console.log('Email sent')
      })
      .catch((error) => {
        console.error(error)
      })
      await accountModel.add(teacher);
      return res.redirect("back")
    }
    else{
        return res.render("vwAdmin/accounts/addTeacher",{
          layout: "admin",
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
