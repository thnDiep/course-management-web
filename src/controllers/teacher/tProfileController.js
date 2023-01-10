import courseModel from "../../models/courseModel.js";
import userModel from "../../models/userModel.js";
import accountModel from "../../models/accountModel.js";
import multer from "multer";
import bcrypt from "bcryptjs";

class tProfileController {
  async index(req, res) {
    const course = await userModel.getAllCourseOfTeacher(
      res.locals.lcAuthTeacher.id
    );
    for (let i = 0; i < course.length; i++) {
      const Rated = await courseModel.getAvgRate(course[i].id);
      const sumRate = await courseModel.getCountFeedback(course[i].id);
      const numberStudent = await userModel.getNumberStudentByCourse(
        course[i].id
      );
      const chapter = await courseModel.getAllChapterOfCourse(course[i].id);
      for (let i = 0; i < chapter.length; i++) {
        chapter[i].index = i + 1;
        chapter[i].lesson = await courseModel.getAllLessonOfChapter(
          chapter[i].id
        );
        for (let j = 0; j < chapter[i].lesson.length; j++) {
          chapter[i].lesson[j].index = j + 1;
          j === chapter[i].lesson.length - 1 && i === chapter.length - 1
            ? (chapter[i].lesson[j].checkLesson = true)
            : (chapter[i].lesson[j].checkLesson = false);
        }
        i === chapter.length - 1 && chapter[i].lesson.length === 0
          ? (chapter[i].checkChapter = true)
          : (chapter[i].checkChapter = false);
        i === chapter.length - 1
          ? (chapter[i].check = true)
          : (chapter[i].check = false);
      }
      course[i].chapter = chapter;
      course[i].rated = (+Rated).toFixed(1);
      course[i].sumRate = (+sumRate).toFixed(0);
      course[i].numberStudent = (+numberStudent).toFixed(0);
      course[i].index = i + 1;
    }
    const [teacher] = await userModel.getInforTeacherByID(
      res.locals.lcAuthTeacher.id
    );
    teacher.courses = course.length;
    teacher.student = await userModel.getNumberStudentOfTeacher(
      res.locals.lcAuthTeacher.id
    );
    teacher.countReview = await userModel.getNumberViewsOfTeacher(
      res.locals.lcAuthTeacher.id
    );
    const isProfile = true;
    res.render("vwteacher/teacherProfile", {
      course,
      isProfile,
      teacher,
      layout: "main",
    });
  }
  async updateImage(req, res) {
    const storage = multer.diskStorage({
      destination: function (req, file, cb) {
        cb(null, "src/public/images/teacherPictures");
      },
      filename: function (req, file, cb) {
        cb(null, file.fieldname + "-" + res.locals.lcAuthTeacher.id + ".jpg");
      },
    });
    const upload = multer({ storage: storage });
    upload.single("image")(req, res, async function (err) {
      if (req.file !== undefined)
        await userModel.updateImage(
          res.locals.lcAuthTeacher.id,
          "/images/teacherPictures/" + req.file.filename
        );

      if (err) console.error(err);
      else {
        if (req.file !== undefined)
          req.session.authTeacher.img =
            "/images/teacherPictures/" + req.file.filename;
        return res.redirect("back");
      }
    });
  }
  async updateAccount(req, res) {
    const [password] = await userModel.getInforTeacherByID(
      res.locals.lcAuthTeacher.id
    );
    const ret = bcrypt.compareSync(req.body.passwordCurrent, password.password);

    if (ret) {
      let hash;
      if (req.body.password !== "") {
        const salt = bcrypt.genSaltSync(10);
        hash = bcrypt.hashSync(req.body.password, salt);
      }
      let name, newPassword, email, about;
      req.body.name === ""
        ? (name = res.locals.lcAuthTeacher.name)
        : (name = req.body.name);
      req.body.password === ""
        ? (newPassword = res.locals.lcAuthTeacher.password)
        : (newPassword = hash);
      req.body.email === ""
        ? (email = res.locals.lcAuthTeacher.email)
        : (email = req.body.email);
      req.body.about === ""
        ? (about = res.locals.lcAuthTeacher.about)
        : (about = req.body.about);
      const teacher1 = {
        id: password.id,
        img: res.locals.lcAuthTeacher.img,
        name,
        email,
        password: newPassword,
        about,
      };
      const nameAvailable = await accountModel.findByUsername(teacher1.name);
      const emailAvailable = await accountModel.findByEmail(teacher1.email);
      let err_message_name, err_message_email;
      const check = (name, check, i) => {
        if (name === check) {
          i === 0
            ? (err_message_name = `${name} was exist...`)
            : (err_message_email = `${name} was exist...`);
          return 0;
        }
        return 1;
      };
      // check xem email va ten trung k
      const checkName = check(nameAvailable?.name, teacher1.name, 0);
      const checkEmail = check(emailAvailable?.email, teacher1.email, 1);
      if (
        (checkName === 1 || teacher1.name === res.locals.lcAuthTeacher.name) &&
        (checkEmail === 1 || teacher1.email === res.locals.lcAuthTeacher.email)
      ) {
        await userModel.updateTeacher(teacher1);
        req.session.authTeacher = teacher1;
        return res.redirect("/teacher/profile");
      } else {
        const course = await userModel.getAllCourseOfTeacher(
          res.locals.lcAuthTeacher.id
        );
        for (let i = 0; i < course.length; i++) {
          const Rated = await courseModel.getAvgRate(course[i].id);
          const sumRate = await courseModel.getCountFeedback(course[i].id);
          const numberStudent = await userModel.getNumberStudentByCourse(
            course[i].id
          );
          const chapter = await courseModel.getAllChapterOfCourse(course[i].id);
          for (let i = 0; i < chapter.length; i++) {
            chapter[i].index = i + 1;
            chapter[i].lesson = await courseModel.getAllLessonOfChapter(
              chapter[i].id
            );
            for (let j = 0; j < chapter[i].lesson.length; j++) {
              chapter[i].lesson[j].index = j + 1;
              j === chapter[i].lesson.length - 1 && i === chapter.length - 1
                ? (chapter[i].lesson[j].checkLesson = true)
                : (chapter[i].lesson[j].checkLesson = false);
            }
            i === chapter.length - 1 && chapter[i].lesson.length === 0
              ? (chapter[i].checkChapter = true)
              : (chapter[i].checkChapter = false);
            i === chapter.length - 1
              ? (chapter[i].check = true)
              : (chapter[i].check = false);
          }
          course[i].chapter = chapter;
          course[i].rated = (+Rated).toFixed(1);
          course[i].sumRate = (+sumRate).toFixed(0);
          course[i].numberStudent = (+numberStudent).toFixed(0);
          course[i].index = i + 1;
        }
        const [teacher] = await userModel.getInforTeacherByID(
          res.locals.lcAuthTeacher.id
        );
        teacher.courses = course.length;
        teacher.student = await userModel.getNumberStudentOfTeacher(
          res.locals.lcAuthTeacher.id
        );
        teacher.countReview = await userModel.getNumberViewsOfTeacher(
          res.locals.lcAuthTeacher.id
        );
        const isProfile = true;
        res.render("vwteacher/teacherProfile", {
          err_message_name,
          err_message_email,
          course,
          isProfile,
          teacher,
          layout: "main",
        });
      }
    } else {
      const course = await userModel.getAllCourseOfTeacher(
        res.locals.lcAuthTeacher.id
      );
      for (let i = 0; i < course.length; i++) {
        const Rated = await courseModel.getAvgRate(course[i].id);
        const sumRate = await courseModel.getCountFeedback(course[i].id);
        const numberStudent = await userModel.getNumberStudentByCourse(
          course[i].id
        );
        course[i].rated = (+Rated).toFixed(1);
        course[i].sumRate = (+sumRate).toFixed(0);
        course[i].numberStudent = (+numberStudent).toFixed(0);
      }
      const [teacher] = await userModel.getInforTeacherByID(
        res.locals.lcAuthTeacher.id
      );
      teacher.courses = course.length;
      teacher.student = await userModel.getNumberStudentOfTeacher(
        res.locals.lcAuthTeacher.id
      );
      teacher.countReview = await userModel.getNumberViewsOfTeacher(
        res.locals.lcAuthTeacher.id
      );
      const isProfile = true;

      return res.render("vwteacher/teacherProfile", {
        course,
        teacher,
        isProfile,
        // layout: "teacher",
        err_message_password: "password is incorrect",
      });
    }
  }
}
export default new tProfileController();
