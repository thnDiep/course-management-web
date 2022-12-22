import homeModel from "../models/homeModel.js";
class homeController {
  // GET categories list
  async index(req, res) {
    const getAll = async (course) => {
      for (let i = 0; i < course.length; i++) {
        const Rated = await homeModel.getAvgRate(course[i].id);
        const sumRate = await homeModel.getCountFeedback(course[i].id);
        const numberStudent = await homeModel.getNumberStudent(course[i].id);
        const teacherName = await homeModel.getTeacher(course[i].id);
        course[i].rated = (+Rated).toFixed(1);
        course[i].sumRate = (+sumRate).toFixed(0);
        course[i].numberStudent = (+numberStudent).toFixed(0);
        course[i].teacherName = teacherName;
      }
    };
    const [trending] = await homeModel.getTrending();
    const [views] = await homeModel.getViews();
    const [lastest] = await homeModel.getLatest();
    await getAll(trending);
    await getAll(views);
    await getAll(lastest);
    const getCourse = (views) => {
      let arrayCourse = [];
      for (let i = 0; i <= views.length / 4; i++) {
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
    });
  }
}

export default new homeController();
