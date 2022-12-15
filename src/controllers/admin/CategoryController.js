import categoriesModel from "../../models/categoriesModel.js";

class CategoryController {
  // GET categories list
  async index(req, res) {
    const categories = await categoriesModel.getAll();
    res.render("vwAdmin/categories/index", {
      categories,
      layout: "admin",
    });
  }

  // GET add categories
  async add(req, res) {
    const categoriesParent = await categoriesModel.getParent();
    res.render("vwAdmin/categories/add", {
      categories: categoriesParent,
      layout: "admin",
    });
  }

  // POST add categories
  async addPost(req, res) {
    if (await categoriesModel.isNameExist(req.body.name)) {
      console.log("tên đã tồn tại");
    } else {
      if (parseInt(req.body.parentID) === 0) {
        delete req.body.parentID;
      }

      await categoriesModel.add(req.body);
    }

    const categories = await categoriesModel.getAll();
    res.render("vwAdmin/categories/add", {
      categories,
      layout: "admin",
    });
  }

  // GET add categories
  async delete(req, res) {
    await categoriesModel.delete(req.query.id);
    res.redirect("/admin/categories");
  }

  // GET update categories
  async update(req, res) {
    const id = parseInt(req.query.id) || 0;
    const category = await categoriesModel.getById(id);

    if (category === null) {
      res.redirect("/admin/categories");
    }

    res.render("vwAdmin/categories/update", {
      category,
      layout: "admin",
    });
  }
}

export default new CategoryController();
