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
    // lay categoryID
    const idCategory = await db.select("idCategory").from("course").where("id", id);
    //lay categoryId parent
    const idCategoryParent = await db.select("parentID").from("category").where("id", idCategory[0].idCategory);
    const result = [];
    if (idCategoryParent[0].parentID !== null) {
      // lay list cac category child
      const childCategory = await db.select("id").from("category").where("parentID", idCategoryParent[0].parentID);
      // voi moi child category ==> add course vao list
      const listSimilarCourse = [];
      
      const course = await db("course").where("idCategory", idCategoryParent[0].parentID);
      listSimilarCourse.push(course);

      for (const child of childCategory) {
        const course = await db("course").where("idCategory", child.id);
        listSimilarCourse.push(course);
      }
      
      for (const child of listSimilarCourse) {
        for (const similarCoure of child) {
          if (similarCoure.id != id) {
            result.push(similarCoure);
          }
        }
      }   
    }
    else{
      const childCategory = await db.select("id").from("category").where("parentID", idCategory[0].idCategory);
      // voi moi child category ==> add course vao list
      const listSimilarCourse = [];
      
      const course = await db("course").where("idCategory", idCategory[0].idCategory);
      listSimilarCourse.push(course);

      for (const child of childCategory) {
        const course = await db("course").where("idCategory", child.id);
        listSimilarCourse.push(course);
      }


      
      for (const child of listSimilarCourse) {
        for (const similarCoure of child) {
          if (similarCoure.id != id) {
            result.push(similarCoure);
          }
        }
      }   
    }
    return result;
  },

  async percent_star(id, numberStar) {
    const rateAll = await db.raw(
      `Select count(id) as sumRate from rating where rating.courseID = ${id}`
    );
    const sumRate = rateAll[0][0].sumRate;

    const rate_star = await db.raw(`Select count(id) as sumRate from rating where rating.courseID = ${id} and rating.star = ${numberStar}`);
    const sumRate_star = rate_star[0][0].sumRate;

    const percentStar = sumRate_star*1.0/sumRate;
    return percentStar * 100;
  },

  // id course
  async getAllFeedback(id){
    const allFeedback = await db("rating").where("courseID", id);
    return allFeedback;
  },

  // async getTimeOfFeedback(id){
  //   const time = await db
  //     .from("rating")
  //     .select("time")
  //     .where("courseID", id);
  //     // .andWhere("studentID",idStudent);

  //   const feedbackTime = this.convertFormatDate(time);
  //   return feedbackTime;
  // },

  async convertFormatDate(date){
    return moment(date).format("YYYY-MM-DD");
  },

  // id student
  async infoStudentOfFeedback(idStd){
    const infoStudent = await db("user").where("id", idStd);
    return infoStudent;
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
  updateCompleteCourse(id, status, updateTime) {
    return db("course").where("id", id).update({
      updateTime: updateTime,
      status: status,
    });
  },

  // SEARCH COURSE BY NAME COURSE
  async totalResultByName(name) {
    const result = await db.raw(
      `SELECT count(id) as count FROM course WHERE MATCH(name) AGAINST("${name}");`
    );
    return result[0][0].count;
  },

  async searchByName(name) {
    const result = await db.raw(
      `SELECT * FROM course WHERE MATCH(name) AGAINST("${name}");`
    );
    return result[0];
  },

  async searchPageByName(name, limit, offset) {
    const result = await db.raw(
      `SELECT * FROM course WHERE MATCH(name) AGAINST("${name}") LIMIT ${limit} OFFSET ${offset};`
    );
    return result[0];
  },

  // SEARCH COURSE BY NAME CATEGORY
  async totalResultByCategory(name) {
    const categories = await db.raw(
      `SELECT id FROM category WHERE MATCH(name) AGAINST("${name}");`
    );

    let result = 0;
    for (const category of categories[0]) {
      const number = await db.raw(
        `SELECT count(id) as count FROM course WHERE course.idCategory = ${category.id};`
      );

      result += number[0][0].count;
    }

    return result;
  },

  async searchByCategory(name) {
    const categories = await db.raw(
      `SELECT id FROM category WHERE MATCH(name) AGAINST("${name}");`
    );

    let ids = [];
    for (const category of categories[0]) {
      ids.push(category.id);
    }
    return await db("course").whereIn("idCategory", ids);
  },

  async searchPageByCategory(name, limit, offset) {
    const categories = await db.raw(
      `SELECT id FROM category WHERE MATCH(name) AGAINST("${name}");`
    );

    let ids = [];
    for (const category of categories[0]) {
      ids.push(category.id);
    }

    return await db("course")
      .whereIn("idCategory", ids)
      .limit(limit)
      .offset(offset);
  },
};
