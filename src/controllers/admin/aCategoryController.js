import multer from "multer";
import categoryModel from "../../models/categoryModel.js";
import courseModel from "../../models/courseModel.js";
import fs from "fs";

class ACategoryController {
  // GET /admin/categories
  async index(req, res) {
    const categories = await categoryModel.getAll();
    for (const category of categories) {
      const courses = await courseModel.getByCategoryId(category.id);
      category.numberCourse = courses.length;
    }

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
    const storage = multer.diskStorage({
      destination: function (req, file, cb) {
        cb(null, "./src/public/images/category");
      },
      filename: async function (req, file, cb) {
        const filename = file.originalname.split(".");

        cb(null, filename[0] + Date.now() + "." + filename[1]);
      },
    });

    const upload = multer({ storage });
    upload.single("image")(req, res, async function (err) {
      if (parseInt(req.body.parentID) === 0) {
        delete req.body.parentID;
      }

      if (req.file !== undefined) {
        req.body.image = req.file.filename;
      }

      await categoryModel.add(req.body);
      if (err) {
        console.error(err);
      } else {
        res.redirect("back");
      }
    });
  }

  // DELETE /admin/categories?id=
  async delete(req, res) {
    const category = await categoryModel.getById(req.query.id);

    if (category.image !== null && category.image !== '') {
      const filePath = "./src/public/images/category/" + category.image;
      fs.unlinkSync(filePath);
    }
    
    await categoryModel.delete(req.query.id);
    res.redirect("back");
  }

  // POST /admin/categories/deleteByCheckbox
  async deleteByCheckbox(req, res) {
    for (const idCategory of req.body.idCategories) {
      await categoryModel.delete(idCategory);
    }
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

      for (const category of childCategories) {
        const courses = await courseModel.getByCategoryId(category.id);
        category.numberCourse = courses.length;
      }

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
