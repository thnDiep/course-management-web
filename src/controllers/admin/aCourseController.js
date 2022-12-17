import categoryModel from "../../models/categoryModel.js";

class aCourseController {
  // GET categories list
  async index(req, res) {
    res.render("vwAdmin/courses", {
      layout: "admin",
    });
  }
}

export default new aCourseController();
