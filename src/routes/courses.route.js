import express from "express";
import courseController from "../controllers/CourseController.js";

const router = express.Router();

router.get("/", courseController.index);
router.get("/detail", courseController.detail);
router.get("/join", courseController.join);
router.get("/feedback", courseController.feedback);
router.get("/search", courseController.search);

export default router;
