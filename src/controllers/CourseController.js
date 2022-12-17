
import courseModel from "../models/courseModel.js";

class CourseController {

     // GET courses list by category
  async index(req, res) {
    const id = parseInt(req.query.id) || 1;
    const parentCategories = await categoryModel.getParent();

    for (const parent of parentCategories) {
      const childs = await categoryModel.getChildByParentID(parent.id);

      for (const child of childs) {
        if (child.id === id) {
          child.isActive = true;
        }
      }

      parent.childs = childs;
      if (parent.id === id) {
        parent.isActive = true;
      }
    }

    res.render("courses", {
      parentCategories,
    });
  }


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
