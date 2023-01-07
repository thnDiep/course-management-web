import db from "../utils/db.js";
import categoryModel from "./categoryModel.js";
export default {
  async getTrending() {
    const courses = await db.raw(`SELECT c.*
                                  FROM rating r,course c
                                  WHERE DATEDIFF(CURDATE(), time) <7
                                        AND c.id=r.courseID 
                                  GROUP BY c.id
                                  ORDER BY AVG(star) DESC LIMIT 4;`);
    return courses;
  },
  async getViews() {
    const courses = await db.raw(`SELECT c.*
                                  FROM course c
                                  ORDER BY views DESC LIMIT 12;`);
    return courses;
  },
  async getLatest() {
    const courses = await db.raw(`SELECT c.*
                                  FROM course c
                                  ORDER BY updateTime DESC LIMIT 12;`);
    return courses;
  },
  async getTopCategory() {
    const categories = await categoryModel.getParent();
    let topCategory = [];
    for (const parent of categories) {
      const childs = await categoryModel.getChildByParentID(parent.id);
      const [numberCourses] = await this.getNumberEnrollCourseByCategory(
        parent.id
      );
      if (numberCourses !== undefined) {
        let sum = +numberCourses?.numberCourses;
        for (const child of childs) {
          const [numberCourse] = await this.getNumberEnrollCourseByCategory(
            child.id
          );
          if (numberCourse !== undefined) sum += +numberCourse?.numberCourses;
        }
        parent.numberCourses = sum;
        if (topCategory.length === 8) break;
        topCategory.push(parent);
      }
    }
    function compare(a, b) {
      if (a.numberCourses < b.numberCourses) {
        return 1;
      }
      if (a.numberCourses > b.numberCourses) {
        return -1;
      }
      return 0;
    }
    return topCategory.sort(compare);
    // const sql = `SELECT COUNT(courseID) as numberCourses
    //             FROM course_of_student cst,category ca ,course c
    //             WHERE DATEDIFF(CURDATE(), enrollDate)<7
    //                   AND cst.courseID=c.id
    //                   AND ca.id=c.idCategory
    //                   and ca.parentID=? GROUP BY ca.parentID;`
    // const [numberCourses] =await db.raw(sql,id);
    // return numberCourses.numberCourses;
  },
  async getNumberEnrollCourseByCategory(id) {
    const sql = `SELECT COUNT(courseID) as numberCourses 
          FROM course_of_student cst,category ca ,course c 
          WHERE DATEDIFF(CURDATE(), enrollDate)<7 
          AND cst.courseID=c.id 
          AND ca.id=c.idCategory AND ca.id = ?
          GROUP BY ca.id;`;
    const [numberCourses] = await db.raw(sql, id);
    return numberCourses;
  },
};
