import express from 'express'
import courseDetail from "../controllers/CourseController.js";

const router = express.Router();
 
router.get("/", (req, res) => {
    res.render("courses", {
      check: false,
    });
});

router.get("/courseDetail", courseDetail.detail);



router.get("/enrollCourse", (req, res) => {
  res.render("enrollCourse");
}) 

export default router;