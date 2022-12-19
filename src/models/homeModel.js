import db from "../utils/db.js";

export default {
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
  async getNumberStudent(id) {
    const [[number], ...h] = await db.raw(
      `SELECT count(courseID) as sumStudent FROM course_of_student WHERE  courseID = ?`,
      id
    );
    return number.sumStudent;
  },
  async getTeacher(id) {
    const [[name], ...h] = await db.raw(
      `SELECT us.name as teacherName 
            FROM course_of_teacher tc, user us  
            WHERE  us.id = tc.teacherID AND tc.courseID = ?`,
      id
    );
    return name.teacherName;
  },
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
};
