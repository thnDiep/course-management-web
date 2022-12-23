import courseModel from "../models/courseModel.js";
import categoryModel from "../models/categoryModel.js";
import userModel from "../models/userModel.js";
import moment from "moment/moment.js";
class CourseController {
  // [GET] /courses?id=
  async index(req, res) {
    const id = parseInt(req.query.id) || 1;

    const limit = 8;
    const totalCourses = await courseModel.countByCategoryId(id);
    let maxPage = Math.floor(totalCourses / limit);
    if (totalCourses % limit) maxPage++;

    const page = parseInt(req.query.page) || 1;
    const offset = (page - 1) * limit;

    const pageNumbers = [];
    for (let i = 1; i <= maxPage; i++) {
      if (i === page) {
        pageNumbers.push({ value: i, isActive: true });
      } else {
        pageNumbers.push({ value: i });
      }
    }

    const category = await categoryModel.getById(id);
    const courses = await courseModel.getPageByCategoryId(id, limit, offset);
    const allCategories = await categoryModel.getAllWithHierarchy(id); // use in category side bar
    const bestSellerCourses = await courseModel.getBestSellerList(5);

    for (const course of courses) {
      const avgRated = await courseModel.getAvgRate(course.id);
      course.rated = (+avgRated).toFixed(1);

      const numberRated = await courseModel.getCountFeedback(course.id);
      course.numberRated = (+numberRated).toFixed(0);

      const teacher = await userModel.getNameTeacher(course.id);
      course.teacher = teacher;

      const category = await categoryModel.getById(course.idCategory);
      const linkCategories = [];

      if (category.parentID !== null) {
        const parentCategory = await categoryModel.getById(category.parentID);
        linkCategories.push(parentCategory);
      }
      linkCategories.push(category);

      course.linkCategories = linkCategories;

      if (course.fee !== course.feeO) {
        course.discount = true;
      }

      bestSellerCourses.forEach((element) => {
        if (element.id === course.id) {
          course.bestSeller = true;
        }
      });
    }

    courseModel.getBestSellerList(5);
    res.render("courses/index", {
      category,
      allCategories,
      courses,
      isEmpty: courses.length === 0,
      pageNumbers,
      isFirstPage: page === 1,
      isLastPage: page === maxPage,
      currentPage: page,
    });
  }

  // [GET] /courses/detail?id=
  async detail(req, res) {
    const id = parseInt(req.query.id) || 1;
    const course = await courseModel.getById(id);

    if (course === null) {
      res.redirect("/courses");
    }
    await courseModel.updateView(id);
    res.render("courseDetail", {
      course,
    });
  }

  // [GET] /courses/join?id=
  async join(req, res) {
    const id = parseInt(req.query.id) || 1;
    const course = await courseModel.join(id);

    if (course === null) {
      res.redirect("/courses");
    }
    await courseModel.updateView(id);
    res.render("enrollCourse", {
      course,
    });
  }

  // [GET] /courses/search?keyword=
  async search(req, res) {
    const keyWord = req.query.keyword || "";
    const courses = await courseModel.getAll(); // Function tìm kiếm
    const bestSellerCourses = await courseModel.getBestSellerList(5);

    for (const course of courses) {
      const avgRated = await courseModel.getAvgRate(course.id);
      course.rated = (+avgRated).toFixed(1);

      const numberRated = await courseModel.getCountFeedback(course.id);
      course.numberRated = (+numberRated).toFixed(0);

      const teacher = await userModel.getNameTeacher(course.id);
      course.teacher = teacher;

      const category = await categoryModel.getById(course.idCategory);
      const linkCategories = [];

      if (category.parentID !== null) {
        const parentCategory = await categoryModel.getById(category.parentID);
        linkCategories.push(parentCategory);
      }
      linkCategories.push(category);

      course.linkCategories = linkCategories;

      if (course.fee !== course.feeO) {
        course.discount = true;
      }

      bestSellerCourses.forEach((element) => {
        if (element.id === course.id) {
          course.bestSeller = true;
        }
      });

      const now = moment();
      const createTime = moment(course.updateTime); // change to createTime later
      if (now.diff(createTime, "days") < 7) {
        course.new = true;
      }
    }

    res.render("courses/search", {
      keyWord,
      numberResult: courses.length,
      courses,
      isEmpty: courses.length === 0,
    });
  }
}

export default new CourseController();
