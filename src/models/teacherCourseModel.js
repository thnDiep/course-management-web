import db from "../utils/db.js";

export default {
  removeCourse(courseID) {
    return db("course_of_teacher").where("courseID", courseID).del();
  },
};
