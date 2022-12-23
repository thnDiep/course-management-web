import categoryModel from "../models/categoryModel.js";
import courseModel from "../models/courseModel.js";
import userModel from "../models/userModel.js";
import homeModel from "../models/homeModel.js";
class SearchController {
  // [GET] /search?q=
  async index(req, res) {
    const keyWord = parseInt(req.query.q);
    const courses = await courseModel.getAll(); // Function tìm kiếm
    const [lastestList] = await homeModel.getLatest();

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

    res.render("search", {
      keyWord,
      courses,
      isEmpty: courses.length === 0,
    });
  }
}

export default new SearchController();
