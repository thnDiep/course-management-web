import courseModel from "../models/courseModel.js";
import categoryModel from "../models/categoryModel.js";
import userModel from "../models/userModel.js";
class CourseController {
  // [GET] /courses?id=
  async index(req, res) {
    const id = parseInt(req.query.id) || 1;
    const category = await categoryModel.getById(id);
    const courses = await courseModel.getByCategoryId(id);
    const allCategories = await categoryModel.getAllWithHierarchy(id); // use in category side bar

    for (const course of courses) {
      const avgRated = await courseModel.getAvgRate(course.id);
      course.rated = (+avgRated).toFixed(1);

      const numberRated = await courseModel.getCountFeedback(course.id);
      course.numberRated = (+numberRated).toFixed(0);

      const teacher = await userModel.getNameTeacher(course.id);
      course.teacher = teacher;

      const category = await categoryModel.getById(course.idCategory);
      const linkCategories = [];

      if (category.parentID !== null) {
        const parentCategory = await categoryModel.getById(category.parentID);
        linkCategories.push(parentCategory);
      }
      linkCategories.push(category);

      course.linkCategories = linkCategories;

      if (course.fee !== course.feeO) {
        course.discount = true;
      }
    }

    res.render("courses", {
      category,
      allCategories,
      courses,
      isEmpty: courses.length === 0,
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
