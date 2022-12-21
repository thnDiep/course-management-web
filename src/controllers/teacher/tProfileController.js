import teacherModel from "../../models/teacherModel.js";
import courseModel from "../../models/courseModel.js";
import studentModel from "../../models/studentModel.js";
class tProfileController {
  async index(req, res) {
    const course = await teacherModel.getAllCourse(3);
    let countStudent = 0;
    let countReview = 0;
    for (let i = 0; i < course.length; i++) {
      const Rated = await courseModel.getAvgRate(course[i].id);
      const sumRate = await courseModel.getCountFeedback(course[i].id);
      const numberStudent = await studentModel.getNumberStudentByCourse(
        course[i].id
      );
      countReview += sumRate;
      countStudent += numberStudent;
      course[i].rated = (+Rated).toFixed(1);
      course[i].sumRate = (+sumRate).toFixed(0);
      course[i].numberStudent = (+numberStudent).toFixed(0);
    }
    const [teacher] = await teacherModel.getAll(3);
    console.log(course);
    teacher.courses = course.length;
    teacher.student = countStudent;
    teacher.countReview = countReview;
    res.render("vwteacher/teacherProfile", {
      course,
      teacher,
      layout: "teacher",
    });
  }
}

export default new tProfileController();
