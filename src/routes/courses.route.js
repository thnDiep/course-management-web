import express from 'express'

const router = express.Router();
 
router.get("/", (req, res) => {
    res.render("courses", {
      check: false,
    });
});


router.get("/courseDetail", (req, res) => {
    res.render("courseDetail");
});

router.get("/enrollCourse", (req, res) => {
  res.render("enrollCourse");
}) 

export default router;