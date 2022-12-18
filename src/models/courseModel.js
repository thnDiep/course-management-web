import db from "../utils/db.js";
import categoryModel from "./categoryModel.js";

export default {
  getAll() {
    return db("course");
  },

  async getById(id) {
    const list = await db("course").where("id", id);
    if (list.length === 0) return null;
    return list[0];
  },

  async getByCategoryId(id) {
    let list = await db("course").where("idCategory", id);
    // id = 1
    // id of course = 2 => still show
    const category = await categoryModel.getById(id);
    if (category.parentID === null) {
      const childCategories = await categoryModel.getChildByParentID(id);
      for (const child of childCategories) {
        const coursesOfChildCategory = await db("course").where(
          "idCategory",
          child.id
        );
        list.push(...coursesOfChildCategory);
      }
    }
    return list;
  },

  add(course) {
    return db("course").insert(course);
  },

  delete(id) {
    return db("course").where("id", id).del();
  },

  updateView(id) {
    db("course").where("id", id).update({
      views: 5,
    });
  },
  //   async isComplete(id) {
  //     const status = await db("course").where()
  //   }
};
