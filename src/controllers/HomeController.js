import homeModel from "../models/homeModel.js";
import courseModel from "../models/courseModel.js";
import userModel from "../models/userModel.js";
import categoryModel from "../models/categoryModel.js";
import studentCourseModel from "../models/studentCourseModel.js";
class homeController {
  // GET categories list
  async index(req, res) {
    let learningCourses, lovedCourses;
    if (res.locals.lcAuthUser?.id !== undefined) {
      console.log("hello");
      learningCourses = await studentCourseModel.getCourseOfStudent(
        res.locals.lcAuthUser.id
      );
      lovedCourses = await studentCourseModel.getCourseStudentLove(
        res.locals.lcAuthUser.id
      );
    }
    const getAll = async (course) => {
      for (let i = 0; i < course.length; i++) {
        if (res.locals.lcAuthUser?.id !== undefined) {
          learningCourses.forEach((learningCourse) => {
            if (learningCourse.courseID === course[i].id) {
              course[i].buyed = true;
              console.log("---------");
            }
          });

          lovedCourses.forEach((lovedCourse) => {
            if (lovedCourse.courseID === course[i].id) {
              course[i].loved = true;
            }
          });
        }
        const Rated = await courseModel.getAvgRate(course[i].id);
        const sumRate = await courseModel.getCountFeedback(course[i].id);
        const numberStudent = await userModel.getNumberStudentByCourse(
          course[i].id
        );
        const teacherName = await userModel.getNameTeacher(course[i].id);
        course[i].rated = (+Rated).toFixed(1);
        course[i].sumRate = (+sumRate).toFixed(0);
        course[i].numberStudent = (+numberStudent).toFixed(0);
        course[i].teacherName = teacherName;
      }
    };
    const [trending] = await homeModel.getTrending();
    const [views] = await homeModel.getViews();
    const [lastest] = await homeModel.getLatest();
    const topCategory = await homeModel.getTopCategory();

    await getAll(trending);
    await getAll(views);
    await getAll(lastest);
    const getCourse = (views) => {
      let arrayCourse = [];
      let n = views.length / 4;
      views.length % 4 === 0 ? (n = n - 1) : (n = n);
      if (views.length !== 0)
        for (let i = 0; i <= n; i++) {
          const citrus = views.slice(0, 4);
          views.splice(0, 4);

          arrayCourse.push({
            courses: citrus,
          });
        }
      return arrayCourse;
    };
    const arrayViewed = getCourse(views);
    const arrayLastest = getCourse(lastest);

    res.render("home", {
      check: true,
      arrayViewed,
      arrayLastest,
      trending,
      topCategory,
    });
  }
}

export default new homeController();
