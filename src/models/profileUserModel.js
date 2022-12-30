import db from "../utils/db.js";
export default {
  getAll() {
    return db("user");
  },
  async getById(id) {
    const list = await db("user").where("id", id);
    return list;
  },
  async getLessonLearning(id) {
    const list = await db.raw(
      `SELECT course.*,history_lesson.*,user.name as TeacherName
      FROM history_lesson,course_of_teacher,user,course,course_of_student 
      WHERE history_lesson.courseID=course_of_teacher.courseID && history_lesson.courseID =course_of_student.courseID && history_lesson.studentID = course_of_student.studentID && course_of_teacher.teacherID=user.id && course_of_teacher.courseID=course.id && history_lesson.studentID= ?`,
      id
    );
    return list[0];
  },
  async getWatchList(id) {
    const list = await db.raw(
      `SELECT course.name as CourseName,user.name as TeacherName, course.image as Img 
      FROM student_love_course,course_of_teacher,user,course 
      WHERE student_love_course.courseID=course_of_teacher.courseID && course_of_teacher.teacherID=user.id && course_of_teacher.courseID=course.id && student_love_course.studentID=?`,
      id
    );
    return list[0];
  },
  // async updateProfile (id){
  //   const list = await db.raw(
  //     `UPDATE user
  //     SET name = "haha122"
  //     WHERE email= "vylee2905@gmail.com=?`, id
  //   );
  //   return list[0];
  // },
};
