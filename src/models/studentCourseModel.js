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

  addLoved(object) {
    return db("student_love_course").insert(object);
  },

  addBuyed(object) {
    return db("course_of_student").insert(object);
  },

  removeLoved(object) {
    return db("student_love_course")
      .where("studentID", object.studentID)
      .andWhere("courseID", object.courseID)
      .del();
  },
};
