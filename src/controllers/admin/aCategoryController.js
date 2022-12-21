import categoryModel from "../../models/categoryModel.js";
import courseModel from "../../models/courseModel.js";

class ACategoryController {
  // GET /admin/categories
  async index(req, res) {
    const categories = await categoryModel.getAll();
    res.render("vwAdmin/categories/index", {
      categories,
      layout: "admin",
    });
  }

  // GET /admin/categories/add
  async add(req, res) {
    const parentCategories = await categoryModel.getParent();

    res.render("vwAdmin/categories/add", {
      parentCategories,
      layout: "admin",
    });
  }

  // GET /admin/categories/add/is-available
  async isAvailableToAdd(req, res) {
    const name = await categoryModel.getByName(req.query.name);
    if (name === null) return res.json(true);
    return res.json(false);
  }

  // POST /admin/categories/add
  async store(req, res) {
    if (parseInt(req.body.parentID) === 0) {
      delete req.body.parentID;
    }

    await categoryModel.add(req.body);
    res.redirect("back");
  }

  // DELETE /admin/categories?id=
  async delete(req, res) {
    await categoryModel.delete(req.query.id);
    res.redirect("back");
  }

  // GET /admin/categories?id=
  async edit(req, res) {
    const id = parseInt(req.query.id) || 1;
    const category = await categoryModel.getById(id);

    if (category === null) {
      res.redirect("/admin/categories");
    } else {
      const courses = await courseModel.getSummaryByCategoryId(id);
      const parentCategories = await categoryModel.getParent();
      const childCategories = await categoryModel.getChildByParentID(id);
      const lastCategory = await categoryModel.getLast();

      parentCategories.forEach((parent) => {
        if (category.parentID === parent.id) {
          parent.isSelected = true;
        }
      });

      res.render("vwAdmin/categories/edit", {
        category,
        courses,
        childCategories,
        parentCategories,
        isFirst: category.id === 1,
        isLast: category.id === lastCategory.id,
        layout: "admin",
      });
    }
  }
}

export default new ACategoryController();
