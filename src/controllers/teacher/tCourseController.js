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
  async editChapter(req, res) {
    const chapter = {
      id: req.query.id,
      name: req.body.name,
      courseID: req.body.courseID,
    };
    await courseModel.updateChapter(chapter);
    return res.redirect("back");
  }
  async editLesson(req, res) {
    const split = req.body.videoID.split("/");
    req.body.videoID = split[split.length - 1];
    const lesson = {
      id: req.query.id,
      name: req.body.name,
      chapterID: req.body.chapterID,
      videoID: req.body.videoID,
    };
    await courseModel.updateLesson(lesson);
    return res.redirect("back");
  }

  async deleteChapter(req, res) {
    await courseModel.deleteChapter(req.query.id);
    return res.redirect("back");
  }
  async deleteLesson(req, res) {
    console.log("-------");
    console.log(req.query.id);
    await courseModel.deleteLesson(req.query.id);
    return res.redirect("back");
  }
  async addChapter(req, res) {
    const chapter = {
      name: req.body.name,
      courseID: req.body.courseID,
    };
    await courseModel.addChapter(chapter);

    return res.redirect("back");
  }
  async addLesson(req, res) {
    console.log("-------");
    const split = req.body.videoID.split("/");
    req.body.videoID = split[split.length - 1];
    const lesson = {
      name: req.body.name,
      chapterID: req.body.chapterID,
      videoID: req.body.videoID,
    };
    await courseModel.addLesson(lesson);
    return res.redirect("back");
  }
  async complete(req, res) {
    const date = new Date();

    let day = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();
    let currentDate = `${year}-${month}-${day}`;

    await courseModel.updateCompleteCourse(req.body.id, 1, currentDate);

    return res.redirect("back");
  }
  async editComplete(req, res) {
    const date = new Date();

    let day = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();
    let currentDate = `${year}-${month}-${day}`;

    await courseModel.updateCompleteCourse(req.body.id, 0, currentDate);

    return res.redirect("back");
  }
}

export default new TCourseController();
