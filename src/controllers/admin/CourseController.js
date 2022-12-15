import categoriesModel from "../../models/categoriesModel.js";

class CourseController {
  // GET categories list
  async index(req, res) {
    res.render("vwAdmin/courses", {
      layout: "admin",
    });
  }
}

export default new CourseController();
