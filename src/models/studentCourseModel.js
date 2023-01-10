import db from "../utils/db.js";

export default {
  getCourseOfStudent(studentID) {
    return db("course_of_student")
      .select("courseID")
      .where("studentID", studentID);
  },

  getCourseStudentLove(studentID) {
    return db("student_love_course")
      .select("courseID")
      .where("studentID", studentID);
  },

  async countCourseOfStudent(studentID) {
    const count = await db("course_of_student")
      .where("studentID", studentID)
      .count("courseID as number");
    return count[0].number;
  },

  async countCourseStudentLove(studentID) {
    const count = await db("student_love_course")
      .where("studentID", studentID)
      .count("courseID as number");
    return count[0].number;
  },

  getPageCourseOfStudent(studentID, limit, offet) {
    return db("course_of_student")
      .select("courseID")
      .where("studentID", studentID)
      .limit(limit)
      .offset(offet);
  },

  getPageCourseStudentLove(studentID, limit, offet) {
    return db("student_love_course")
      .select("courseID")
      .where("studentID", studentID)
      .limit(limit)
      .offset(offet);
  },

  addBuyed(object) {
    return db("course_of_student").insert(object);
  },

  addLoved(object) {
    return db("student_love_course").insert(object);
  },

  removeLoved(object) {
    return db("student_love_course")
      .where("studentID", object.studentID)
      .andWhere("courseID", object.courseID)
      .del();
  },
};
