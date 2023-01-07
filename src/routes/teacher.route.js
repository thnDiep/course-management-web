import express from "express";
import tCourseController from "../controllers/teacher/tCourseController.js";
import tProfileController from "../controllers/teacher/tProfileController.js";
import courseController from "../controllers/CourseController.js";
import isTeacher from "../middlewares/isTeacher.mdw.js";
import auth from "../middlewares/auth.mdw.js";
const router = express.Router();

router.get("/profile", auth, isTeacher, tProfileController.index);

router.get("/createCourse", auth, isTeacher, tCourseController.index);
router.get("/editCourse", auth, isTeacher, tCourseController.editCourse);
router.put("/editCourse", auth, isTeacher, tCourseController.edit);
router.get("/course/detail", auth, isTeacher, courseController.detail);

router.put("/course/chapter", auth, isTeacher, tCourseController.editChapter);
router.put("/course/lesson", auth, isTeacher, tCourseController.editLesson);
router.delete(
  "/course/chapter",
  auth,
  isTeacher,
  tCourseController.deleteChapter
);
router.delete(
  "/course/lesson",
  auth,
  isTeacher,
  tCourseController.deleteLesson
);

router.post(
  "/course/addChapter",
  auth,
  isTeacher,
  tCourseController.addChapter
);
router.post("/course/addLesson", auth, isTeacher, tCourseController.addLesson);

router.post("/course/complete", auth, isTeacher, tCourseController.complete);
router.post(
  "/course/editComplete",
  auth,
  isTeacher,
  tCourseController.editComplete
);
// const upload = multer({ dest: 'uploads/' })

router.put(
  "/profile/account",
  auth,
  isTeacher,
  tProfileController.updateAccount
);
router.put("/profile/image", auth, isTeacher, tProfileController.updateImage);
router.post("/createCourse", auth, isTeacher, tCourseController.create);
export default router;
