import courseModel from "../../models/courseModel.js";
import userModel from "../../models/userModel.js";
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
}

export default new tProfileController();
