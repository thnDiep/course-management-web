import courseModel from "../../models/courseModel.js";
import userModel from "../../models/userModel.js";
import accountModel from "../../models/accountModel.js";
import multer from 'multer'
import bcrypt from "bcryptjs";

class tProfileController {
  async index(req, res) {
    const course = await userModel.getAllCourseOfTeacher(3);
    let countStudent = 0;
    let countReview = 0;
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
    // console.log(course);
    teacher.courses = course.length;
    teacher.student = await userModel.getNumberStudentOfTeacher(3);
    teacher.countReview = await userModel.getNumberViewsOfTeacher(3);
    res.render("vwteacher/teacherProfile", {
      course,
      teacher,
      layout: "teacher",
    });
  }
  async update(req, res) {
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
}

export default new tProfileController();
