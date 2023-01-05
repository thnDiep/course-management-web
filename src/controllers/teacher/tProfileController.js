import courseModel from "../../models/courseModel.js";
import userModel from "../../models/userModel.js";
import accountModel from "../../models/accountModel.js";
import multer from 'multer'
import bcrypt from "bcryptjs";

class tProfileController {
  async index(req, res) {
    const course = await userModel.getAllCourseOfTeacher(3);
    for (let i = 0; i < course.length; i++) {
      const Rated = await courseModel.getAvgRate(course[i].id);
      const sumRate = await courseModel.getCountFeedback(course[i].id);
      const numberStudent = await userModel.getNumberStudentByCourse(
        course[i].id
      );
      const chapter = await courseModel.getAllChapterOfCourse(course[i].id);
      for (let i = 0; i < chapter.length; i++) {
        chapter[i].index = i + 1;
        chapter[i].lesson = await courseModel.getAllLessonOfChapter(chapter[i].id);
        console.log(chapter[i].lesson.length)
        for (let j = 0; j < chapter[i].lesson.length; j++) {
          chapter[i].lesson[j].index = j + 1;
        }
      }
      console.log(chapter)
      course[i].chapter = chapter;
      course[i].rated = (+Rated).toFixed(1);
      course[i].sumRate = (+sumRate).toFixed(0);
      course[i].numberStudent = (+numberStudent).toFixed(0);
      course[i].index = i + 1;
    }
    const [teacher] = await userModel.getInforTeacherByID(3);
    teacher.courses = course.length;
    teacher.student = await userModel.getNumberStudentOfTeacher(3);
    teacher.countReview = await userModel.getNumberViewsOfTeacher(3);
    res.render("vwteacher/teacherProfile", {
      course,
      teacher,
      layout: "teacher",
    });
  }
  async updateImage(req, res) {
    console.log("-------------")

    const storage = multer.diskStorage({
      destination: function (req, file, cb) {
        cb(null, 'src/public/images/teacherPictures')
      },
      filename: function (req, file, cb) {
        cb(null, file.fieldname + "-" + "1" + ".jpg")
      }
    })
    const upload = multer({ storage: storage });
    upload.single('image')(req, res, async function (err) {
      await userModel.updateImage(3, "/images/teacherPictures/" + req.file.filename)

      console.log("/images/teacherPictures/" + req.file.filename)
      console.log("-------------")
      if (err)
        console.error(err)
      else
        return res.redirect("back")
    })

  }
  async updateAccount(req, res) {
    console.log("-------------1111")
    console.log(req.body.about)

    const [password] = await userModel.getInforTeacherByID(3)
    const ret = bcrypt.compareSync(req.body.passwordCurrent, password.password);

    if (ret) {
      const salt = bcrypt.genSaltSync(10);
      const hash = bcrypt.hashSync(req.body.passwordCurrent, salt);
      const teacher = {
        id: password.id,
        name: req.body.name,
        email: req.body.email,
        password: hash,
        about: req.body.about,
      }
      await userModel.updateTeacher(teacher);
      return res.redirect("/teacher/profile");

    } else {
      const course = await userModel.getAllCourseOfTeacher(3);
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
      const [teacher] = await userModel.getInforTeacherByID(3);
      teacher.name = req.body.name;
      teacher.email = req.body.email;
      // console.log(course);
      teacher.courses = course.length;
      teacher.student = await userModel.getNumberStudentOfTeacher(3);
      teacher.countReview = await userModel.getNumberViewsOfTeacher(3);
      return res.render("vwteacher/teacherProfile", {
        course,
        teacher,
        layout: "teacher",
        err_message_password: "password is incorrect"
      });
    }
  }
}
export default new tProfileController();
