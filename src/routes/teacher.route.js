import express from "express";
import tCourseController from "../controllers/teacher/tCourseController.js";
import tProfileController from "../controllers/teacher/tProfileController.js";

const router = express.Router();

router.get("/profile", tProfileController.index);

router.get("/createCourse", tCourseController.index);

router.put("/course/chapter", tCourseController.editChapter);
router.put("/course/lesson", tCourseController.editLesson);
router.delete("/course/chapter", tCourseController.deleteChapter);
router.delete("/course/lesson", tCourseController.deleteLesson);

router.post("/course/addChapter", tCourseController.addChapter);
router.post("/course/addLesson", tCourseController.addLesson);

router.post("/course/complete", tCourseController.complete);
router.post("/course/editComplete", tCourseController.editComplete);
// const upload = multer({ dest: 'uploads/' })

router.put("/profile/account", tProfileController.updateAccount);
router.put("/profile/image", tProfileController.updateImage);
router.post("/createCourse", tCourseController.create);
export default router;
