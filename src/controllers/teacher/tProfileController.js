import courseModel from "../../models/courseModel.js";
import userModel from "../../models/userModel.js";
import accountModel from "../../models/accountModel.js";
class tProfileController {
  async index(req, res) {
    const course = await userModel.getAllCourseOfTeacher(3);
    let countStudent = 0;
    let countReview = 0;
    for (let i = 0; i < course.length; i++) {
      const Rated = await courseModel.getAvgRate(course[i].id);
      const sumRate = await courseModel.getCountFeedback(course[i].id);
      const numberStudent = await userModel.getNumberStudentByCourse(
        course[i].id
      );
      course[i].rated = (+Rated).toFixed(1);
      course[i].sumRate = (+sumRate).toFixed(0);
      course[i].numberStudent = (+numberStudent).toFixed(0);
    }
    const [teacher] = await userModel.getInforTeacherByID(3);
    // console.log(course);
    teacher.courses = course.length;
    teacher.student = await userModel.getNumberStudentOfTeacher(3);
    teacher.countReview = await userModel.getNumberViewsOfTeacher(3);
    res.render("vwteacher/teacherProfile", {
      course,
      teacher,
      layout: "teacher",
    });
  }
  async update(req,res){
    let teacherId = 1;
    const realPass = accountModel.findByEmailToCheckPassword(req.email);
    if(realPass === req.body.currentPassword)
    { 
      const salt = bcrypt.genSaltSync(10);
      const hash = bcrypt.hashSync(req.body.password, salt);
      const teacher = {
        id: teacherId,
        name: req.body.name,
        email: req.body.email,
        password: hash,
        permissionID: 3
      }
    }
  }
}

export default new tProfileController();
