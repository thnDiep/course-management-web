import db from "../utils/db.js";

export default {
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

  async getAllCourse(id) {
    const [course] = await db.raw(
      `SELECT c.* 
      FROM course_of_teacher tc,course c 
      WHERE tc.courseID = c.id AND tc.teacherID=?`,
      id
    );
    return course;
  },
  async getAll(id) {
    const [teacher] = await db.raw(
      `SELECT tc.* 
      FROM user tc 
      WHERE tc.permissionID = 3 AND tc.id=?`,
      id
    );
    return teacher;
  },
};
