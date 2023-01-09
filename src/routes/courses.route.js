import express from "express";
import courseController from "../controllers/CourseController.js";
import auth from "../middlewares/auth.mdw.js";
import isUser from "../middlewares/isUser.mdw.js";

const router = express.Router();

router.get("/", courseController.index);

router.get("/detail", courseController.detail);
router.get("/feedback", auth, isUser, courseController.feedback);

// Tham gia khóa học
router.get("/join", auth, isUser, courseController.join);
router.get("/enroll", auth, isUser, courseController.enroll);
router.get("/learning", auth, isUser, courseController.learning);

// Yêu thích khóa học
router.get("/unlike", auth, isUser, courseController.unlike);
router.get("/like", auth, isUser, courseController.like);
router.get("/watch-list", auth, isUser, courseController.watchList);

// Tìm kiếm khóa học
router.get("/search", courseController.search);

export default router;
