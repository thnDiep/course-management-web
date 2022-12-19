import db from "../utils/db.js";
export default {
  getAll() {
    return db("course");
  },
  async getById(id) {
    const list = await db("course").where("id", id);
    return list;
  },
  async getTopic(id) {
    const list = await db.raw(
      `SELECT course.name as CourseName,user.name as TeacherName, course.image as Img 
      FROM history_lesson,course_of_teacher,user,course 
      WHERE history_lesson.courseID=course_of_teacher.courseID && course_of_teacher.teacherID=user.id && course_of_teacher.courseID=course.id && history_lesson.studentID=? `,
      id
    );
    return list[0];
  },
  
};

