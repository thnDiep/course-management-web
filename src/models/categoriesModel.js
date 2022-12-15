import db from "../utils/db.js";

export default {
  getAll() {
    return db("categories");
  },

  getParent() {
    return db("categories").whereNull("parentID");
  },

  async getById(id) {
    const list = await db("categories").where("id", id);
    if (list.length === 0) return null;
    return list[0];
  },

  add(category) {
    return db("categories").insert(category);
  },

  delete(id) {
    return db("categories").where("id", id).del();
  },

  async isNameExist(name) {
    const list = await db("categories").where("name", name);
    if (list.length === 0) return false;
    return true;
  },
};
