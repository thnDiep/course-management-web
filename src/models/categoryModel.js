import db from "../utils/db.js";

export default {
  getAll() {
    return db("category");
  },

  getParent() {
    return db("category").whereNull("parentID");
  },

  getChild() {
    return db("category").whereNotNull("parentID");
  },

  getChildByParentID(id) {
    return db("category").where("parentID", id);
  },

  async getById(id) {
    const list = await db("category").where("id", id);
    if (list.length === 0) return null;
    return list[0];
  },

  getNumberChildCategory() {
    return db
      .select("c1.id", "c1.name")
      .table("category as c1")
      .groupBy("c1.id", "c1.name")
      .join("category as c2", "c2.parentID", "c1.id")
      .count("c2.id as number");
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
