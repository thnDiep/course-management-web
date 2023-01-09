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
    const isProfile = true;
    res.render("vwteacher/createCourse", {
      parentCourse,
      isProfile,
      childCourse,
      // layout: "teacher",
    });
  }
  async editCourse(req, res) {
    const course = await courseModel.getById(req.query.id);
    const parentCourse = await categoryModel.getParent();
    const childCourse = await categoryModel.getChild();
    const getName = await categoryModel.getById(course.idCategory);
    const temp = parentCourse[0].name;
    for (const name of parentCourse) {
      if (name.name === getName.name) {
        name.name = temp;
        parentCourse[0].name = getName.name;
        break;
      }
    }
    for (const name of childCourse) {
      if (name.name === getName.name) {
        name.name = temp;
        parentCourse[0].name = getName.name;
        break;
      }
    }
    const isProfile = true;

    res.render("vwteacher/editCourse", {
      course,
      parentCourse,
      isProfile,
      childCourse,
      // layout: "teacher",
    });
  }
  async edit(req, res) {
    upload.fields([
      { name: "image", maxCount: 1 },
      { name: "videoID", maxCount: 1 },
    ])(req, res, async function (err) {
      // Xác định category cho khóa học
      console.log(req.body.nameCategory);

      const category = await categoryModel.getByName(req.body.nameCategory);

      const date = new Date();

      let day = date.getDate();
      let month = date.getMonth() + 1;
      let year = date.getFullYear();
      let currentDate = `${year}-${month}-${day}`;

      // Format số tiền đã nhập lưu db
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
      if (req.files !== undefined) {
        req.body.image = "/images/course/" + req.files["image"][0].filename;
        req.body.videoID = "/images/course/" + req.files["videoID"][0].filename;
      }
      const course = {
        id: req.query.id,
        name: req.body.name,
        idCategory: category.id,
        image: req.body.image,
        videoID: req.body.videoID,
        status: 0,
        fee: +req.body.fee,
        feeO: +req.body.feeO,
        tinyDescription: req.body.tinyDescription,
        required: req.body.required,
        fullDescription: req.body.fullDesciption,
        benefit: req.body.benefit,
        views: 0,
        updateTime: currentDate,
      };
      await courseModel.updateCourse(course);
      return res.redirect("back");
    });
  }
  async create(req, res) {
    upload.fields([
      { name: "image", maxCount: 1 },
      { name: "videoID", maxCount: 1 },
    ])(req, res, async function (err) {
      // Xác định category cho khóa học
      // console.log("-----------");
      // console.log(req.body.nameCategory);
      // console.log(req.body.nameParent);
      const category = await categoryModel.getByName(req.body.nameCategory);

      const date = new Date();

      let day = date.getDate();
      let month = date.getMonth() + 1;
      let year = date.getFullYear();
      let currentDate = `${year}-${month}-${day}`;

      // Format số tiền đã nhập lưu db
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
      if (req.files !== undefined) {
        req.body.image = "/images/course/" + req.files["image"][0].filename;
        req.body.videoID = "/images/course/" + req.files["videoID"][0].filename;
      }
      const course = {
        name: req.body.name,
        idCategory: category.id,
        image: req.body.image,
        videoID: req.body.videoID,
        fee: +req.body.fee,
        feeO: +req.body.feeO,
        tinyDescription: req.body.tinyDescription,
        required: req.body.required,
        fullDescription: req.body.fullDesciption,
        benefit: req.body.benefit,
        updateTime: currentDate,
        createTime: currentDate,
      };
      await courseModel.add(course);
      const [id] = await courseModel.getIDCourseByName(req.body.name);
      const course_of_teacher = {
        teacherID: res.locals.lcAuthTeacher.id,
        courseID: id.id,
      };
      await courseModel.addCourseOfTeacher(course_of_teacher);
      return res.redirect("/teacher/profile");
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
    upload.single("videoID")(req, res, async function (err) {
      if (req.file !== undefined) {
        req.body.videoID = req.file.filename;
      }
      const lesson = {
        id: req.query.id,
        name: req.body.name,
        chapterID: req.body.chapterID,
        videoID: req.body.videoID,
      };
      await courseModel.updateLesson(lesson);
      return res.redirect("back");
    });
  }

  async deleteChapter(req, res) {
    await courseModel.deleteChapter(req.query.id);
    return res.redirect("back");
  }
  async deleteLesson(req, res) {
    console.log(req.body.nameChild);
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
    upload.single("videoID")(req, res, async function (err) {
      if (req.file !== undefined) {
        console.log("gdfgdfgdf");

        req.body.videoID = req.file.filename;
      }
      console.log("req.file");
      console.log(req.file);
      const lesson = {
        name: req.body.name,
        chapterID: req.body.chapterID,
        videoID: req.body.videoID,
      };
      await courseModel.addLesson(lesson);
      return res.redirect("back");
    });
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
