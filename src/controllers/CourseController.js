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
    if (maxPage !== 1) {
      for (let i = 1; i <= maxPage; i++) {
        if (i === page) {
          pageNumbers.push({ value: i, isActive: true });
        } else {
          pageNumbers.push({ value: i });
        }
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
    const isCourse = true;
    courseModel.getBestSellerList(5);
    res.render("courses/index", {
      isCourse,
      category,
      allCategories,
      courses,
      isEmpty: courses.length === 0,
      pageInfo: {
        current: page,
        isFirst: page === 1,
        isLast: page === maxPage,
        numbers: pageNumbers,
      },
    });
  }

  // [GET] /courses/detail?id=
  async detail(req, res) {
    const id = parseInt(req.query.id) || 1;
    const course = await courseModel.getById(id);

    const avgRated = await courseModel.getAvgRate(course.id);
    course.rated = (+avgRated).toFixed(1);

    const numberRated = await courseModel.getCountFeedback(course.id);
    course.numberRated = (+numberRated).toFixed(0);

    const isComplete = await courseModel.isComplete(id);
    const teacher = await courseModel.teacherOfCourse(id);
    const numberOfStudent = await userModel.getNumberStudentByCourse(id);
    const updateTime = await courseModel.getUpdateTime(id);
    const numberStudentOfTeacher = await userModel.getNumberStudentOfTeacher(id);
    const NumberCourseOfTeacher = await userModel.getNumberCourseOfTeacher(id);
    const listSimilarCourse = await courseModel.getSimilarCourse(id);
    const listSimilar = [];
    for (const course of listSimilarCourse) {
      if (course.id !== id){
        listSimilar.push(course);
      }
    }

    const numberRating = await courseModel.getCountFeedback(id);

    const percent_5star = await courseModel.percent_star(id, 5);
    const percent_4star = await courseModel.percent_star(id, 4);
    const percent_3star = await courseModel.percent_star(id, 3);
    const percent_2star = await courseModel.percent_star(id, 2);
    const percent_1star = await courseModel.percent_star(id, 1);

    const percentInfo = [{
      index: 5,
      percent: percent_5star
    },
    {
      index: 4,
      percent: percent_4star
    },
    {
      index: 3,
      percent: percent_3star
    },
    {
      index: 2,
      percent: percent_2star
    },
    {
      index: 1,
      percent: percent_1star
    }]
    // console.log(listSimilarCourse);

    if (course === null) {
      res.redirect("/courses");
    }
    await courseModel.updateView(id);
    const isCourse = true;

    const category = await categoryModel.getById(course.idCategory);
    const linkCategories = [];
    if (category.parentID !== null) {
      const parentCategory = await categoryModel.getById(category.parentID);
      linkCategories.push(parentCategory);
    }
    linkCategories.push(category);
    // console.log(linkCategories);

    // course.linkCategories = linkCategories;

    res.render("courses/courseDetail", {
      course,
      isCourse,
      isComplete,
      teacher,
      numberOfStudent,
      updateTime,
      numberStudentOfTeacher,
      NumberCourseOfTeacher,
      listSimilar,
      linkCategories,
      numberRating,
      percentInfo,
    });
  }

  // [GET] /courses/join?id=
  async join(req, res) {
    const id = parseInt(req.query.id) || 1;
    const course = await courseModel.join(id);

    if (course === null) {
      res.redirect("/courses");
    }
    const isCourse = true;

    await courseModel.updateView(id);
    res.render("courses/enrollCourse", {
      isCourse,
      course,
    });
  }

  // [GET] /courses/search?keyword=
  async search(req, res) {
    const courses = await courseModel.getAll();
    const keyWord = req.query.keyword || "";
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
    const isCourse = true;

    res.render("courses/search", {
      keyWord,
      isCourse,
      numberResult: courses.length,
      courses,
      isEmpty: courses.length === 0,
    });
  }
}

export default new CourseController();
