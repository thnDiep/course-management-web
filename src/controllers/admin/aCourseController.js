import categoryModel from "../../models/categoryModel.js";
import courseModel from "../../models/courseModel.js";
import userModel from "../../models/userModel.js";
class ACourseController {
  // GET /admin/courses?category=&teacher=
  async index(req, res) {
    let allCourses;
    const courses = [];

    const categoryID = parseInt(req.query.category) || 0;
    const teacherID = parseInt(req.query.teacher) || 0;
    const categories = await categoryModel.getAll();
    const teachers = await userModel.getAllTeacher();

    if (categoryID !== 0 && teacherID !== 0) {
      allCourses = await courseModel.getSummaryByCategoryAndTeacherId(
        categoryID,
        teacherID
      );
    } else if (categoryID !== 0 && teacherID === 0) {
      allCourses = await courseModel.getSummaryByCategoryId(categoryID);
    } else if (categoryID === 0 && teacherID !== 0) {
      allCourses = await courseModel.getSummaryByTeacherId(teacherID);
    } else {
      allCourses = await courseModel.getAll();
    }

    for (const courseFull of allCourses) {
      const course = {
        id: courseFull.id,
        name: courseFull.name,
        blocked: courseFull.blocked,
      };
      courses.push(course);
    }
    const isCourses = true;

    res.render("vwAdmin/courses", {
      categoryID,
      isCourses,
      teacherID,
      courses,
      categories,
      teachers,
      layout: "admin",
    });
  }

  // PUT /admin/courses/block?id=&blocked=&
  async blocked(req, res) {
    const isBlocked = req.query.blocked === "true";
    await courseModel.updateCourseBlocked(parseInt(req.query.id), isBlocked);
    res.redirect("back");
  }

  // DELETE /admin/courses?id=
  async delete(req, res) {
    await courseModel.delete(req.query.id);
    res.redirect("back");
  }

  // POST /admin/courses/deleteByCheckbox
  async deleteByCheckbox(req, res) {
    for (const idCourse of req.body.idCourses) {
      await courseModel.delete(idCourse);
    }
    res.redirect("back");
  }
}

export default new ACourseController();
