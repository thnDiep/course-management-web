import db from "../utils/db.js";

export default {
  async getNumberStudentByCourse(id) {
    const [[number], ...h] = await db.raw(
      `SELECT count(courseID) as sumStudent FROM course_of_student WHERE  courseID = ?`,
      id
    );
    return number.sumStudent;
  },
};
