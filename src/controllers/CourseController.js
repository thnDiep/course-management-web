
import courseModel from "../models/courseModel.js";

class CourseController {


  async detail(req, res) {
    const id = parseInt(req.query.id) || 0;
    const course = await courseModel.getById(id);

    if (course === null) {
      res.redirect("/courses");
    }

    res.render("courseDetail", {
      course
    });
  }

}


export default new CourseController();
