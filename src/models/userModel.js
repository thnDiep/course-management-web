import db from "../utils/db.js";

export default {
  ////////////////////////////////
  // student
  async getNumberStudentByCourse(id) {
    const [[number], ...h] = await db.raw(
      `SELECT count(courseID) as sumStudent FROM course_of_student WHERE  courseID = ?`,
      id
    );
    return number.sumStudent;
  },
  ////////////////////////////////
  // teacher
  async getNameTeacher(id) {
    const [[name], ...h] = await db.raw(
      `SELECT us.name as teacherName 
            FROM course_of_teacher tc, user us  
            WHERE  us.id = tc.teacherID AND us.permissionID = 3 AND tc.courseID = ?`,
      id
    );
    // console.log(name);
    return name?.teacherName;
  },

  async getAllCourseOfTeacher(id) {
    const [course] = await db.raw(
      `SELECT c.* 
      FROM course_of_teacher tc,course c 
      WHERE tc.courseID = c.id AND tc.teacherID=?`,
      id
    );
    return course;
  },
  async getInforTeacherByID(id) {
    const [teacher] = await db.raw(
      `SELECT tc.* 
      FROM user tc 
      WHERE tc.permissionID = 3 AND tc.id=?`,
      id
    );
    return teacher;
  },
  // get all infor of student and teacher
  async getAllStudentAndTeacher() {
    const [user] = await db.raw(
      `SELECT us.*, pm.name as ruleName
      FROM user us, permission pm
      WHERE us.permissionID != 1 AND pm.id = us.permissionID`
    );
    return user;
  },
  delete(id) {
    return db("user").where("id", id).del();
  },
  // get sum student of teacher
  async getNumberStudentOfTeacher(id) {
    const [[numberStudent]] = await db.raw(
      `SELECT COUNT(st.studentID) as number
      FROM course_of_teacher tc,course_of_student st
      WHERE tc.courseID = st.courseID AND tc.teacherID = ?`, id
    )
    return numberStudent.number;
  },
  // get sum views of teacher by id
  async getNumberViewsOfTeacher(id) {
    const [[views]] = await db.raw(
      `SELECT count(star) as sumRate 
      FROM rating, course_of_teacher tc 
      WHERE  rating.courseID = tc.courseID AND tc.teacherID = ?`, id
    );
    return views.sumRate;
  },
  // get sum course of teacher by id
  async getNumberCourseOfTeacher(id) {
    const [views] = await db("course_of_teacher").count("courseID as count").where("teacherID", id);
    return views.count;
  }

};
