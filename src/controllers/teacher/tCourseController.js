import courseModel from "../../models/courseModel.js";
import categoryModel from "../../models/categoryModel.js";
class TCourseController {
  
  async index(req, res) {
    const parentCourse = await categoryModel.getParent();
    const childCourse = await categoryModel.getChild();
    res.render("vwteacher/createCourse", {
      parentCourse,
      childCourse,
      layout:"teacher",
    });
  }
}

export default new TCourseController();
