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
    await getAll(trending);
    await getAll(views);
    console.log(views);
    let people = [1, 2, 3, 4];
    res.render("home", {
      check: true,
      people,
      trending,
      views,
    });
  }
}

export default new homeController();
