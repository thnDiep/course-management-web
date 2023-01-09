import multer from "multer";
import categoryModel from "../../models/categoryModel.js";
import courseModel from "../../models/courseModel.js";
import fs from "fs";

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
const isCategories = true;
class ACategoryController {
  // GET /admin/categories
  async index(req, res) {
    const categories = await categoryModel.getAll();
    for (const category of categories) {
      const courses = await courseModel.getByCategoryId(category.id);
      category.enabledDelete = true;
      category.numberCourse = courses.length;

      if (category.numberCourse) {
        category.enabledDelete = false;
        continue;
      }

      if (!category.parentID) {
        const childCategories = await categoryModel.getChildByParentID(
          category.id
        );
        if (childCategories.length) {
          category.enabledDelete = false;
        }
      }
    }

    res.render("vwAdmin/categories/index", {
      categories,
      isCategories,
      layout: "admin",
    });
  }

  // GET /admin/categories/add
  async add(req, res) {
    const parentCategories = await categoryModel.getParent();

    res.render("vwAdmin/categories/add", {
      parentCategories,
      isCategories,
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

  // POST /admin/categoris/addChild?name=&parentID=
  async storeChild(req, res) {
    await categoryModel.add(req.query);
    res.redirect("back");
  }

  // POST /admin/categories/multi-add
  async multiStore(req, res) {
    upload.array("image", 10)(req, res, async function (err) {
      console.log(req.files);
      console.log(req.body);

      const length = req.body.name.length;
      const categories = [];
      for (let i = 0; i < length; i++) {
        categories.push({
          name: req.body.name[i],
          parentID: req.body.parentID[i],
          // image: req.files.filename[i],
        });
      }

      for (const category of categories) {
        await categoryModel.add(category);
      }

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

    if (category.image !== null && category.image !== "") {
      const filePath = "./src/public/images/category/" + category.image;
      try {
        fs.unlinkSync(filePath);
      } catch (err) {
        console.error(err);
      }
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

  // GET /admin/categories/edit?id=
  async edit(req, res) {
    const id = parseInt(req.query.id) || 1;
    const category = await categoryModel.getById(id);

    if (category === null) {
      res.redirect("/admin/categories");
    } else {
      const courses = await courseModel.getSummaryByCategoryId(id);
      const parentCategories = await categoryModel.getParent();
      const childCategories = await categoryModel.getChildByParentID(id);
      category.enabledEditParentID = true;

      if (!category.parentID) {
        const childCategories = await categoryModel.getChildByParentID(id);
        if (childCategories.length) {
          category.enabledEditParentID = false;
        }

        for (const category of childCategories) {
          const courses = await courseModel.getByCategoryId(category.id);
          category.numberCourse = courses.length;
        }
      }

      parentCategories.forEach((parent) => {
        if (category.parentID === parent.id) {
          parent.isSelected = true;
        }
      });

      res.render("vwAdmin/categories/edit", {
        category,
        isCategories,
        courses,
        childCategories,
        parentCategories,
        layout: "admin",
      });
    }
  }

  // PUT /admin/categories/edit?id=
  async update(req, res) {
    upload.single("image")(req, res, async function (err) {
      if (parseInt(req.body.parentID) === 0) {
        req.body.parentID = null;
      }

      if (req.file !== undefined) {
        req.body.image = req.file.filename;
      }

      await categoryModel.update(req.body);
      if (err) {
        console.error(err);
      } else {
        res.redirect("back");
      }
    });
  }
}

export default new ACategoryController();
