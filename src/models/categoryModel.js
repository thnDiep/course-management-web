import db from "../utils/db.js";

export default {
  getAll() {
    return db("category");
  },

  getParent() {
    return db("category").whereNull("parentID");
  },

  async getById(id) {
    const list = await db("category").where("id", id);
    if (list.length === 0) return null;
    return list[0];
  },

  add(category) {
    return db("category").insert(category);
  },

  delete(id) {
    return db("category").where("id", id).del();
  },

  async isNameExist(name) {
    const list = await db("category").where("name", name);
    if (list.length === 0) return false;
    return true;
  },
};
