import courseModel from "../models/courseModel.js";
import categoryModel from "../models/categoryModel.js";

class CourseController {
  // [GET] /courses
  async index(req, res) {
    const id = parseInt(req.query.id) || 1;
    const category = await categoryModel.getById(id);
    const linkCategories = [];

    if (category.parentID !== null) {
      const parentCategory = await categoryModel.getById(category.parentID);
      linkCategories.push(parentCategory);
    }
    linkCategories.push(category);

    const courses = await courseModel.getByCategoryId(id);

    const allCategories = await categoryModel.getAllWithHierarchy(id); // use in category side bar
    res.render("courses", {
      category,
      allCategories,
      courses,
      isEmpty: courses.length === 0,
      linkCategories,
    });
  }

  // [GET] /courses/detail?id=
  async detail(req, res) {
    const id = parseInt(req.query.id) || 1;
    const course = await courseModel.getById(id);

    if (course === null) {
      res.redirect("/courses");
    }
    await courseModel.updateView(id);
    res.render("courseDetail", {
      course,
    });
  }

  // [GET] /courses/join?id=
  async join(req, res) {
    const id = parseInt(req.query.id) || 1;
    const course = await courseModel.join(id);

    if (course === null) {
      res.redirect("/courses");
    }
    await courseModel.updateView(id);
    res.render("enrollCourse", {
      course,
    });
  }
}

export default new CourseController();
