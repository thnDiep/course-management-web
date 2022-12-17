import categoryModel from "../../models/categoryModel.js";

class CourseController {
  // GET categories list
  async index(req, res) {
    res.render("vwAdmin/courses", {
      layout: "admin",
    });
  }
  async add(req, res) {
    res.render("");
  }
}

export default new CourseController();
