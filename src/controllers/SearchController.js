import categoryModel from "../models/categoryModel.js";
import courseModel from "../models/courseModel.js";
class SearchController {
  // [GET] /search?q=
  async index(req, res) {
    const keyWord = parseInt(req.query.q);
    const courses = await courseModel.getAll(); // Function tìm kiếm

    for (const course of courses) {
      const category = await categoryModel.getById(course.idCategory);
      const linkCategories = [];

      if (category.parentID !== null) {
        const parentCategory = await categoryModel.getById(category.parentID);
        linkCategories.push(parentCategory);
      }
      linkCategories.push(category);

      course.linkCategories = linkCategories;
    }

    res.render("search", {
      keyWord,
      courses,
      isEmpty: courses.length === 0,
    });
  }
}

export default new SearchController();
