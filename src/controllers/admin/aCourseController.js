import categoryModel from "../../models/categoryModel.js";
import courseModel from "../../models/courseModel.js";

class ACourseController {
  // GET /admin/courses
  async index(req, res) {
    const coursesFull = await courseModel.getAll();
    const courses = [];

    for (const courseFull of coursesFull) {
      const category = await categoryModel.getById(courseFull.idCategory);
      const course = {
        id: courseFull.id,
        name: courseFull.name,
        category: category.name,
      };
      courses.push(course);
    }

    res.render("vwAdmin/courses", {
      courses,
      layout: "admin",
    });
  }

    // DELETE /admin/courses?id=
    async delete(req, res) {
      await courseModel.delete(req.query.id);
      res.redirect("back");
    }
}

export default new ACourseController();
