import express from "express";
import courseController from "../controllers/CourseController.js";

const router = express.Router();

router.get("/", courseController.index);

router.get("/detail", courseController.detail);

// Tham gia khóa học
router.get("/join", courseController.join);
router.get("/enroll", courseController.enroll);
router.get("/learning", courseController.learning);

// Yêu thích khóa học
router.get("/unlike", courseController.unlike);
router.get("/like", courseController.like);
router.get("/watch-list", courseController.watchList);

router.get("/search", courseController.search);

export default router;
