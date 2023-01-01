import { link } from "fs";
import db from "../utils/db.js";
import categoryModel from "./categoryModel.js";

export default {
  // get course / courses
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
    const category = await categoryModel.getById(id);
    const ids = [id];

    if (category.parentID === null) {
      const childCategories = await categoryModel.getChildByParentID(id);
      childCategories.forEach((childCategory) => {
        ids.push(childCategory.id);
      });
    }

    return await db("course").whereIn("idCategory", ids);
  },

  async getSummaryByCategoryId(id) {
    const category = await categoryModel.getById(id);
    const ids = [id];

    if (category.parentID === null) {
      const childCategories = await categoryModel.getChildByParentID(id);
      childCategories.forEach((childCategory) => {
        ids.push(childCategory.id);
      });
    }

    return await db("course").select("id", "name").whereIn("idCategory", ids);
  },

  async getPageByCategoryId(id, limit, offset) {
    const category = await categoryModel.getById(id);
    const ids = [id];

    if (category.parentID === null) {
      const childCategories = await categoryModel.getChildByParentID(id);
      childCategories.forEach((childCategory) => {
        ids.push(childCategory.id);
      });
    }

    return await db("course")
      .whereIn("idCategory", ids)
      .limit(limit)
      .offset(offset);
  },

  async getBestSellerList(limit) {
    return await db
      .select("id")
      .table("course as C")
      .groupBy("C.id")
      .join("course_of_student as buyed", "buyed.courseID", "C.id")
      .count("buyed.courseID as count")
      .orderBy("count", "DESC")
      .limit(limit);
  },

  //
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

  async countByCategoryId(id) {
    const category = await categoryModel.getById(id);
    const ids = [id];

    if (category.parentID === null) {
      const childCategories = await categoryModel.getChildByParentID(id);
      childCategories.forEach((childCategory) => {
        ids.push(childCategory.id);
      });
    }

    const result = await db("course")
      .whereIn("idCategory", ids)
      .count("id as number");
    return result[0].number;
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
