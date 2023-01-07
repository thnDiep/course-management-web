import { link } from "fs";
import moment from "moment";
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

  async getDirectByCategoryId(id) {
    return await db("course").where("idCategory", id);
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

  // Lượt bán nhiều nhất
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

  // Lượt đánh giá nhiều nhất
  async getTrendingList(limit) {
    return await db
      .select("C.id")
      .table("course as C")
      .groupBy("C.id")
      .join("rating as R", "R.courseID", "C.id")
      .count("R.id as count")
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
  addChapter(chapter) {
    return db("chapter").insert(chapter);
  },
  addLesson(lesson) {
    return db("lesson").insert(lesson);
  },
  delete(id) {
    return db("course").where("id", id).del();
  },
  deleteChapter(id) {
    return db("chapter").where("id", id).del();
  },
  deleteLesson(id) {
    return db("lesson").where("id", id).del();
  },
  async join(id) {
    const list = await db("lesson").where("id", id);
    if (list.length === 0) return null;
    return list[0];
  },

  async isComplete(id) {
    const status = await db.select("status").from("course").where("id", id);
    if (status[0].status === 1) {
      return true;
    } else return false;
  },

  async teacherOfCourse(id) {
    const teacherID = await db
      .select("teacherID")
      .from("course_of_teacher")
      .where("courseID", id);
    const teacher = await db("user").where("id", teacherID[0].teacherID);
    return teacher[0];
  },

  async getUpdateTime(id) {
    const Time = await db.select("updateTime").from("course").where("id", id);
    const updateTime = moment(Time[0].updateTime).format("YYYY-MM-DD");
    return updateTime;
  },

  async getSimilarCourse(id) {
    const idCategory = await db
      .select("idCategory")
      .from("course")
      .where("id", id);
    let listSimilarCourse = await db("course").where(
      "idCategory",
      idCategory[0].idCategory
    );

    return listSimilarCourse;
  },

  async percent_star(id, numberStar) {
    const rateAll = await db.raw(
      `Select count(id) as sumRate from rating where rating.courseID = ${id}`
    );
    const sumRate = rateAll[0][0].sumRate;
    console.log(sumRate);

    const rate_star = await db.raw(
      `Select count(id) as sumRate from rating where rating.courseID = ${id} and rating.star = ${numberStar}`
    );
    const sumRate_star = rate_star[0][0].sumRate;
    console.log(sumRate_star);

    const percentStar = (sumRate_star * 1.0) / sumRate;

    console.log(percentStar);
    return percentStar * 100;
  },

  async updateView(id) {
    let [getView] = await db.select("views").from("course").where("id", id);
    // console.log(getView.views);
    await db("course").where("id", id).update("views", ++getView.views);
  },

  async getAllChapterOfCourse(id) {
    const chapter = await db("chapter").where("courseID", id);
    return chapter;
  },
  async getAllLessonOfChapter(id) {
    const lesson = await db("Lesson").where("chapterID", id);
    return lesson;
  },
  updateChapter(chapter) {
    return db("chapter").where("id", chapter.id).update(chapter);
  },
  updateLesson(lesson) {
    return db("lesson").where("id", lesson.id).update(lesson);
  },

  // SEARCH COURSE
  async searchByName(name) {
    const result = await db.raw(
      `SELECT * FROM course WHERE MATCH(name) AGAINST("${name}");`
    );
    return result[0];
  },

  async searchByCategory(category) {
    const categories = await db.raw(
      `SELECT id FROM category WHERE MATCH(name) AGAINST("${category}");`
    );

    let results = [];
    for (const category of categories[0]) {
      const courses = await this.getDirectByCategoryId(category.id);
      results.push(...courses);
    }
    return results;
  },
};
