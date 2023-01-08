import db from "../utils/db.js";

export default {
  getAll() {
    return db("user");
  },
  async findById(id) {
    const list = await db("user").where("id", id);
    if (list.length === 0) return null;

    return list[0];
  },
  async findByUsername(name) {
    const list = await db("user").where("name", name);
    if (list.length === 0) return null;

    return list[0];
  },
  async findByEmail(email) {
    const list = await db("user").where("email", email);
    if (list.length === 0) return null;

    return list[0];
  },
  async findByUsernameToCheckPassword(name) {
    let list = null;
    if (this.findByUsername(name) !== null) {
      list = await db.raw(`SELECT password FROM user WHERE name = ?`, name);
    }

    return list[0];
  },
  async findByEmailToCheckPassword(email) {
    let list = null;
    if (this.findByEmail(email) !== null) {
      list = await db.raw(`SELECT password FROM user WHERE email = ?`, email);
    }

    return list[0];
  },
  async findByEmailToGetDetail(email) {
    let list = null;
    if (this.findByEmail(email) !== null) {
      list = await db.raw(`SELECT * FROM user WHERE email = ?`, email);
    }

    return list[0];
  },
  add(user) {
    // console.log(user.password);
    return db("user").insert(user);
  },
  del(id) {
    return db("user").where("id", id).del();
  },
  update(user) {
    return db("user").where("id", user.id).update(user);
  },
  updateActive(user) {
    // console.log(user.isActive);
    return db("user").where("id", user.id).update({
      isActive: user.isActive,
    });
  },
};
