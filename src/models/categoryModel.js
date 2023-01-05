import db from "../utils/db.js";

export default {
  getAll() {
    return db("category");
  },

  async getLast() {
    const lastCategory = await db("category").orderBy("id", "desc").limit(1);
    return lastCategory[0];
  },

  // get hierarchical list category
  async getAllWithHierarchy(idActive) {
    const categories = await this.getParent();

    for (const parent of categories) {
      const childs = await this.getChildByParentID(parent.id);

      for (const child of childs) {
        if (child.id === idActive) {
          child.isActive = true;
        }
      }

      parent.childs = childs;
      if (parent.id === idActive) {
        parent.isActive = true;
      }
    }

    return categories;
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

  async getByName(name) {
    const list = await db("category").where("name", name);
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

  update(category) {
    return db("category").where("id", category.id).update(category);
  },

  async isNameExist(name) {
    const list = await db("category").where("name", name);
    if (list.length === 0) return false;
    return true;
  },
};
