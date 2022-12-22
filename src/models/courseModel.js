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

  async getSummaryById(id) {
    const list = await db("course").select("id", "name").where("id", id);
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

  async getSummaryByCategoryId(id) {
    let list = await db("course").select("id", "name").where("idCategory", id);
    // id = 1
    // id of course = 2 => still show
    const category = await categoryModel.getById(id);
    if (category.parentID === null) {
      const childCategories = await categoryModel.getChildByParentID(id);
      for (const child of childCategories) {
        const coursesOfChildCategory = await db("course")
          .select("id", "name")
          .where("idCategory", child.id);
        list.push(...coursesOfChildCategory);
      }
    }
    return list;
  },

  async getAvgRate(id) {
    const [[rate], ...h] = await db.raw(
      `SELECT AVG(star) as avgRate FROM rating WHERE  rating.courseID = ?`,
      id
    );
    return rate.avgRate;
  },
  async getCountFeedback(id) {
    const [[rate], ...h] = await db.raw(
      `SELECT count(star) as sumRate FROM rating WHERE  rating.courseID = ?`,
      id
    );
    return rate.sumRate;
  },
  add(course) {
    return db("course").insert(course);
  },

  delete(id) {
    return db("course").where("id", id).del();
  },

  async join(id) {
    const list = await db("lesson").where("id", id);
    if (list.length === 0) return null;
    return list[0];
  },

  async updateView(id) {
    let [getView] = await db.select("views").from("course").where("id", id);
    console.log(getView.views);
    await db("course").where("id", id).update("views", ++getView.views);
  },
  //   async isComplete(id) {
  //     const status = await db("course").where()
  //   }
};
