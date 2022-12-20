import categoryModel from "../../models/categoryModel.js";

class ACategoryController {
  // GET categories list
  async index(req, res) {
    const categories = await categoryModel.getAll();
    res.render("vwAdmin/categories/index", {
      categories,
      layout: "admin",
    });
  }

  // GET add categories
  async add(req, res) {
    const parentCategories = await categoryModel.getParent();

    res.render("vwAdmin/categories/add", {
      parentCategories,
      layout: "admin",
    });
  }

  // POST add categories
  async addPost(req, res) {
    if (await categoryModel.isNameExist(req.body.name)) {
      console.log("tên đã tồn tại");
    } else {
      if (parseInt(req.body.parentID) === 0) {
        delete req.body.parentID;
      }

      await categoryModel.add(req.body);
    }

    const parentCategories = await categoryModel.getParent();
    res.render("vwAdmin/categories/add", {
      parentCategories,
      layout: "admin",
    });
  }

  // DELETE /admin/category?id=
  async delete(req, res) {
    await categoryModel.delete(req.query.id);
    res.redirect("back");
  }

  // GET update categories
  async update(req, res) {
    const id = parseInt(req.query.id) || 1;
    const category = await categoryModel.getById(id);
    const parentCategories = await categoryModel.getParent();

    if (category === null) {
      res.redirect("/admin/categories");
    }

    parentCategories.forEach((parent) => {
      if (category.parentID === parent.id) {
        parent.isSelected = true;
      }
    });

    res.render("vwAdmin/categories/update", {
      category,
      parentCategories,
      layout: "admin",
    });
  }
}

export default new ACategoryController();
