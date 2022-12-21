import db from "../utils/db.js";

export default {
  // student
  async getNumberStudentByCourse(id) {
    const [[number], ...h] = await db.raw(
      `SELECT count(courseID) as sumStudent FROM course_of_student WHERE  courseID = ?`,
      id
    );
    return number.sumStudent;
  },
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
  async getAllStudentAndTeacher() {
    const [user] = await db.raw(
      `SELECT us.*, pm.name as ruleName
      FROM user us, permission pm
      WHERE us.permissionID != 1 AND pm.id = us.permissionID`
    );
    return user;
  },
};
