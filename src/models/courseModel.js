import db from "../utils/db.js";

export default {
  getAll() {
    return db("course");
  },


  async getById(id) {
    const list = await db("course").where("id", id);
    if (list.length === 0) return null;
    return list[0];
  },

  add(course) {
    return db("course").insert(course);
  },

  delete(id) {
    return db("course").where("id", id).del();
  },

  async isNameExist(name) {
    const list = await db("course").where("name", name);
    if (list.length === 0) return false;
    return true;
  },

//   async isComplete(id) {
//     const status = await db("course").where()
//   }
};
