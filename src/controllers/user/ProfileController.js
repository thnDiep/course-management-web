import profileUserModel from "../../models/profileUserModel.js";
import multer from "multer";
import bcrypt from "bcryptjs";
import courseModel from "../../models/courseModel.js";
import accountModel from "../../models/accountModel.js";
import userModel from "../../models/userModel.js";
class uProfileController {
  // GET categories list
  async index(req, res) {
    const [profiles] = await profileUserModel.getById(res.locals.lcAuthUser.id);
    const lesson_learned = await profileUserModel.getLessonLearning(
      res.locals.lcAuthUser.id
    );
    const lesson_love = await profileUserModel.getWatchList(
      res.locals.lcAuthUser.id
    );
    const isProfile = true;
    res.render("profile", {
      isProfile,
      profiles,
      lesson_learned,
      lesson_love,
    });
  }
  async getLearning(req, res) {
    const learning = await profileUserModel.getLessonLearning(
      res.locals.lcAuthUser.id
    );
    for (let i = 0; i < learning.length; i++) {
      const rated = await courseModel.getAvgRate(learning[i].id);
      learning[i].rated = (+rated).toFixed(1);
    }
    const isLearning = true;
    res.render("vwStudent/learningCourses", {
      isLearning,
      learning,
    });
  }
  async getWatchList(req, res) {
    const lesson_love = await profileUserModel.getWatchList(
      res.locals.lcAuthUser.id
    );
    for (let i = 0; i < lesson_love.length; i++) {
      const rated = await courseModel.getAvgRate(lesson_love[i].id);
      lesson_love[i].rated = (+rated).toFixed(1);
    }
    res.render("vwStudent/watchList", {
      lesson_love,
    });
  }
  async updateProfile(req, res) {
    const ret = bcrypt.compareSync(
      req.body.password,
      res.locals.lcAuthUser.password
    );
    const [profiles] = await profileUserModel.getById(res.locals.lcAuthUser.id);
    const lesson_learned = await profileUserModel.getLessonLearning(
      res.locals.lcAuthUser.id
    );
    const lesson_love = await profileUserModel.getWatchList(
      res.locals.lcAuthUser.id
    );
    const isProfile = true;
    if (ret) {
      let hash;
      if (req.body.newPassword !== undefined) {
        const salt = bcrypt.genSaltSync(10);
        hash = bcrypt.hashSync(req.body.newPassword, salt);
      }
      const Name = req.body.name || res.locals.lcAuthUser.name;
      const Email = req.body.email || res.locals.lcAuthUser.email;
      const Password = hash || res.locals.lcAuthUser.password;
      const user = {
        id: res.locals.lcAuthUser.id,
        name: Name,
        email: Email,
        password: Password,
      };

      let err_message_name, err_message_email, err_message;
      const check = (name, check, i) => {
        if (name === check) {
          // i=0 gán vào tên
          // i=1 gán vào email
          i === 0
            ? (err_message_name = `${name} was exist...`)
            : (err_message_email = `${name} was exist...`);
          return 0;
        }
        return 1;
      };
      // Kiếm nó trong db nếu ko thấy trùng Hoặc so nó với Local đúng là chính nó thì cho update
      const userAvailable = await accountModel.findByUsername(user.name);
      const emailAvailable = await accountModel.findByEmail(user.email);
      // profile = res.locals.lcAuthUser
      if (
        (check(userAvailable?.name, user.name, 0) === 1 ||
          user.name === res.locals.lcAuthUser.name) &&
        (check(emailAvailable?.email, user.email, 1) === 1 ||
          user.email === res.locals.lcAuthUser.email)
      ) {
        await profileUserModel.updateUser(user);
        res.locals.lcAuthUser.email = user.email;
        res.locals.lcAuthUser.name = user.name;
        res.locals.lcAuthUser.password = user.password;

        return res.redirect("/profile");
      } else {
        return res.render("profile", {
          // layout: false,
          isProfile,
          profiles,
          lesson_learned,
          lesson_love,
          err_message_name,
          err_message_email,
        });
      }
    } else {
      return res.render("profile", {
        err_message_password: "Password is not correct...",
        isProfile,
        profiles,
        lesson_learned,
        lesson_love,
      });
    }
  }
  async updateImage(req, res) {
    const storage = multer.diskStorage({
      destination: function (req, file, cb) {
        cb(null, "src/public/images/studentPictures");
      },
      filename: function (req, file, cb) {
        cb(null, file.fieldname + "-" + res.locals.lcAuthUser.id + ".jpg");
      },
    });
    const upload = multer({ storage: storage });
    upload.single("image")(req, res, async function (err) {
      if (req.file !== undefined)
        await userModel.updateImage(
          res.locals.lcAuthUser.id,
          "/images/studentPictures/" + req.file.filename
        );

      if (err) console.error(err);
      else {
        if (req.file !== undefined)
          req.session.authUser.img =
            "/images/studentPictures/" + req.file.filename;
        return res.redirect("back");
      }
    });
  }
}
export default new uProfileController();
