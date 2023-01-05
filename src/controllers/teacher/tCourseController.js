import courseModel from "../../models/courseModel.js";
import multer from "multer";
import categoryModel from "../../models/categoryModel.js";
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./src/public/images/course");
  },
  filename: async function (req, file, cb) {
    const filename = file.originalname.split(".");

    cb(null, filename[0] + Date.now() + "." + filename[1]);
  },
});

const upload = multer({ storage });
class TCourseController {
  async index(req, res) {
    const parentCourse = await categoryModel.getParent();
    const childCourse = await categoryModel.getChild();
    res.render("vwteacher/createCourse", {
      parentCourse,
      childCourse,
      layout: "teacher",
    });
  }
  async create(req, res) {
    upload.single("image")(req, res, async function (err) {
      let category;
      if (req.body.nameChild !== "null") {
        category = await categoryModel.getByName(req.body.nameChild);
      } else {
        category = await categoryModel.getByName(req.body.nameParent);
      }

      const date = new Date();

      let day = date.getDate();
      let month = date.getMonth() + 1;
      let year = date.getFullYear();
      let currentDate = `${year}-${month}-${day}`;
      console.log(req.body.fee); // "17-6-2022"
      const fee = req.body.fee.slice(1);
      let x = fee.split(",");
      let check = "";
      for (let i = 0; i < x.length; i++) {
        check += x[i];
      }
      req.body.fee = check;

      const feeO = req.body.feeO.slice(1);
      let y = feeO.split(",");
      let check1 = "";
      for (let i = 0; i < y.length; i++) {
        check1 += y[i];
      }
      req.body.feeO = check1;

      if (req.file !== undefined) {
        req.body.image = "/images/course/" + req.file.filename;
      }
      const course = {
        name: req.body.name,
        idCategory: category.id,
        image: req.body.image,
        videoID: req.body.videoID,
        status: 1,
        fee: +req.body.fee,
        feeO: +req.body.feeO,
        tinyDescription: req.body.tinyDescription,
        required: req.body.required,
        fullDescription: req.body.fullDesciption,
        benefit: req.body.benefit,
        views: 0,
        updateTime: currentDate,
        createTime: currentDate,
      };
      await courseModel.add(course);
      return res.redirect("back");
    });
  }
}

export default new TCourseController();
