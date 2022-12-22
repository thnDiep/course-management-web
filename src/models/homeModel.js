import db from "../utils/db.js";

export default {
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
  async getLatest() {
    const courses = await db.raw(`SELECT c.*
                                  FROM course c
                                  ORDER BY updateTime DESC LIMIT 12;`);
    return courses;
  },
};
