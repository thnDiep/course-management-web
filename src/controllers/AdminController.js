import categoriesModel from "../models/categoriesModel.js";

class AdminController {
  // GET index
  index(req, res) {
    res.render("vwAdmin/index");
  }

  // GET categories list
  categories(req, res) {
    const categories = categoriesModel.getAll();
    res.render("vwAdmin/categories/index", {
      categories,
      layout: "admin",
    });
  }

  // GET add categories
  categoriesAdd(req, res) {
    res.render("vwAdmin/categories/add", {
      layout: "admin",
    });
  }

  // GET update categories
  categoriesUpdate(req, res) {
    const id = parseInt(req.query.id) || 0;
    const category = categoriesModel.findById(id);

    if (category === null) {
      res.redirect("/admin/categories");
    }

    res.render("vwAdmin/categories/update", {
      category,
      layout: "admin",
    });
  }

  // GET add categories
  courses(req, res) {
    res.render("vwAdmin/courses", {
      layout: "admin",
    });
  }
}

export default new AdminController();
