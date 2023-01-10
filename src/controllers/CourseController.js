import courseModel from "../models/courseModel.js";
import categoryModel from "../models/categoryModel.js";
import userModel from "../models/userModel.js";
import moment from "moment/moment.js";
import studentCourseModel from "../models/studentCourseModel.js";

class CourseController {
  // [GET] /courses?id=
  async index(req, res) {
    const id = parseInt(req.query.id) || 1;

    const limit = 8;
    const totalCourses = await courseModel.countByCategoryId(id);
    const page = parseInt(req.query.page) || 1;
    const offset = (page - 1) * limit;

    const maxPage = computeMaxPage(limit, totalCourses);
    const pageNumbers = computePageNumbers(page, maxPage);

    const category = await categoryModel.getById(id);
    const courses = await courseModel.getPageByCategoryId(id, limit, offset);
    const allCategories = await categoryModel.getAllWithHierarchy(id); // use in category side bar
    const isCourse = true;

    await getInfoCourse(courses, res);

    res.render("courses/index", {
      isCourse,
      category,
      courses,
      allCategories,
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
    // const limit = 5;
    // const totalCourses = await courseModel.countByCategoryId(id);
    // let maxPage = Math.floor(totalCourses / limit);
    // if (totalCourses % limit) maxPage++;

    // const page = parseInt(req.query.page) || 1;
    // const offset = (page - 1) * limit;

    // const pageNumbers = [];
    // if (maxPage !== 1) {
    //   for (let i = 1; i <= maxPage; i++) {
    //     if (i === page) {
    //       pageNumbers.push({ value: i, isActive: true });
    //     } else {
    //       pageNumbers.push({ value: i });
    //     }
    //   }
    // }

    const course = await courseModel.getById(id);

    // get course content
    const courseContent = await courseModel.getById(id);
    const chapter = await courseModel.getAllChapterOfCourse(id);
    for (let i = 0; i < chapter.length; i++) {
      chapter[i].index = i + 1;
      chapter[i].lesson = await courseModel.getAllLessonOfChapter(
        chapter[i].id
      );
      for (let j = 0; j < chapter[i].lesson.length; j++) {
        chapter[i].lesson[j].index = j + 1;
        j === chapter[i].lesson.length - 1 && i === chapter.length - 1
          ? (chapter[i].lesson[j].checkLesson = true)
          : (chapter[i].lesson[j].checkLesson = false);
      }
      i === chapter.length - 1 && chapter[i].lesson.length === 0
        ? (chapter[i].checkChapter = true)
        : (chapter[i].checkChapter = false);
      i === chapter.length - 1
        ? (chapter[i].check = true)
        : (chapter[i].check = false);
    }
    courseContent.chapter = chapter;

    // get info for barStar
    const avgRated = await courseModel.getAvgRate(course.id);
    course.rated = (+avgRated).toFixed(1);

    const numberRated = await courseModel.getCountFeedback(course.id);
    course.numberRated = (+numberRated).toFixed(0);

    // check status of course
    const isComplete = await courseModel.isComplete(id);

    // check discount
    if (course.fee !== course.feeO) {
      course.discount = true;
    }

    // get teacher of course
    const teacher = await courseModel.teacherOfCourse(id);

    const numberOfStudent = await userModel.getNumberStudentByCourse(id);
    const updateTime = await courseModel.getUpdateTime(id);
    const numberStudentOfTeacher = await userModel.getNumberStudentOfTeacher(
      id
    );
    const NumberCourseOfTeacher = await userModel.getNumberCourseOfTeacher(id);
    // get similar course list
    const listSimilarCourse = await courseModel.getSimilarCourse(id);
    const listSimilar = [];
    // lay 5 khoa hoc tuong tu
    const limit = 5;
    var i = 0;
    for (const course of listSimilarCourse) {
      if (course.id !== id && i < limit) {
        listSimilar.push(course);
        i++;
      }
    }

    // phan quyen trong course Detail
    // student
    if (res.locals.lcAuthUser) {
      const userID = res.locals.lcAuthUser.id;
      // lấy khóa học đã đăng ký
      const learningCourses = await studentCourseModel.getCourseOfStudent(
        userID
      );
      learningCourses.forEach((learningCourse) => {
        if (learningCourse.courseID === id) {
          course.buyed = true;
        }
      });
      // lấy khóa học yêu thích
      const lovedCourses = await studentCourseModel.getCourseStudentLove(
        userID
      );
      lovedCourses.forEach((lovedCourse) => {
        if (lovedCourse.courseID === id) {
          course.loved = true;
        }
      });
    }

    // gv
    if (res.locals.lcAuthTeacher) {
      const userID = res.locals.lcAuthTeacher.id;
      // lấy khóa học của gv
      const coursesOfTeacher = await userModel.getAllCourseOfTeacher(userID);
      for (const course of coursesOfTeacher) {
        if (course.id === course.id) {
          course.isCourseOfTeacher = true;
          console.log("la course cuagv", course.isCourseOfTeacher);
        }
      }

      // get info for chart rating
      const numberRating = await courseModel.getCountFeedback(id);

      const percent_5star = await courseModel.percent_star(id, 5);
      const percent_4star = await courseModel.percent_star(id, 4);
      const percent_3star = await courseModel.percent_star(id, 3);
      const percent_2star = await courseModel.percent_star(id, 2);
      const percent_1star = await courseModel.percent_star(id, 1);

      const percentInfo = [
        {
          index: 5,
          percent: percent_5star,
        },
        {
          index: 4,
          percent: percent_4star,
        },
        {
          index: 3,
          percent: percent_3star,
        },
        {
          index: 2,
          percent: percent_2star,
        },
        {
          index: 1,
          percent: percent_1star,
        },
      ];
      const allFeedback = await courseModel.getAllFeedback(id);
      // const feedbackTime = await courseModel.getTimeOfFeedback(id);

      // const timeOfFeedback = await courseModel.convertFormatDate(allFeedback.time);
      allFeedback.forEach((feedback) => {
        const time = moment(feedback.time).format("MM/DD/YYYY HH:mm:ss");
        feedback.time = time;
      });

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

      // course.linkCategories = linkCategories;

      res.render("courses/courseDetail", {
        // layout: "teacher",
        course,
        courseContent,
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
        allFeedback,
        // pageInfo: {
        //   current: page,
        //   isFirst: page === 1,
        //   isLast: page === maxPage,
        //   numbers: pageNumbers,
        // },
        // searchOptions,
        // feedbackTime,
        // timeOfFeedback,
      });
    }
  }

  // [GET] /courses/join?idCourse={idCourse}&idChapter={idChapter}&idLesson={idLesson}
  async join(req, res) {
    const idCourse = parseInt(req.query.idCourse) || 1;
    const idChapter = parseInt(req.query.idChapter) || 1;
    const idLesson = parseInt(req.query.idLesson) || 1;
    const course = await courseModel.getById(idCourse);
    const teacher = await courseModel.teacherOfCourse(idCourse);

    // for BARSTAR
    const avgRated = await courseModel.getAvgRate(course.id);
    course.rated = (+avgRated).toFixed(1);
    const numberRated = await courseModel.getCountFeedback(course.id);
    course.numberRated = (+numberRated).toFixed(0);
    const numberRating = await courseModel.getCountFeedback(idCourse);

    const numberOfStudent = await userModel.getNumberStudentByCourse(idCourse);
    const updateTime = await courseModel.getUpdateTime(idCourse);

    // for CATEGORYBAR
    const category = await categoryModel.getById(course.idCategory);
    const linkCategories = [];
    if (category.parentID !== null) {
      const parentCategory = await categoryModel.getById(category.parentID);
      linkCategories.push(parentCategory);
    }
    linkCategories.push(category);

    const chapters = await courseModel.getAllChapterOfCourse(idCourse);
    const lesson = await courseModel.getLessonByID(idLesson);

    // for SIDEBAR
    const courseContent = await courseModel.getById(idCourse);
    const chapter = await courseModel.getAllChapterOfCourse(idCourse);
    for (let i = 0; i < chapter.length; i++) {
      chapter[i].index = i + 1;
      chapter[i].lesson = await courseModel.getAllLessonOfChapter(
        chapter[i].id
      );
      for (let j = 0; j < chapter[i].lesson.length; j++) {
        chapter[i].lesson[j].index = j + 1;
        j === chapter[i].lesson.length - 1 && i === chapter.length - 1
          ? (chapter[i].lesson[j].checkLesson = true)
          : (chapter[i].lesson[j].checkLesson = false);
      }
      i === chapter.length - 1 && chapter[i].lesson.length === 0
        ? (chapter[i].checkChapter = true)
        : (chapter[i].checkChapter = false);
      i === chapter.length - 1
        ? (chapter[i].check = true)
        : (chapter[i].check = false);
    }
    courseContent.chapter = chapter;

    // add feeback

    // const rating = {
    //   star =
    // }
    if (course === null) {
      res.redirect("/courses");
    }
    const isCourse = true;

    // await courseModel.updateView(idCourse);
    res.render("courses/enrollCourse", {
      course,
      idCourse,
      isCourse,
      idChapter,
      idLesson,
      teacher,
      chapters,
      lesson,
      courseContent,
      numberRating,
      numberOfStudent,
      updateTime,
      linkCategories,
      // searchOptions,
    });
    // res.json("h");
  }

  // [GET] /courses/feedback
  async feedback(req, res) {
    const idStudent = res.locals.lcAuthUser.id;
    const numberRate = req.query.rating;
    const msg = req.query.feedback;
    const currentTime = new Date();

    const idCourse = parseInt(req.query.idCourse) || 1;

    const rating = {
      star: numberRate,
      feedback: msg,
      courseID: idCourse,
      studentID: idStudent,
      time: currentTime,
    };

    courseModel.addRating(rating);
    res.redirect("back");
  }

  // [GET] /courses/enroll?id=
  async enroll(req, res) {
    const studentID = res.locals.lcAuthUser.id;
    const courseID = parseInt(req.query.id);
    let exists = false;

    if (courseID && studentID) {
      const learningCourses = await studentCourseModel.getCourseOfStudent(
        studentID
      );
      learningCourses.forEach((learningCourse) => {
        if (learningCourse.courseID === courseID) {
          exists = true;
          return;
        }
      });

      // Nếu chưa có thì add
      if (!exists) {
        const now = moment(new Date()).format("YYYY-MM-DD HH:mm:ss");
        const result = {
          studentID,
          courseID,
          enrollDate: now,
        };
        await studentCourseModel.addBuyed(result);
      }
    }
    res.redirect("back");
  }

  // [GET] /courses/learning
  async learning(req, res) {
    const studentID = res.locals.lcAuthUser.id;
    const courses = [];

    const limit = 3;
    const totalCourses = await studentCourseModel.countCourseOfStudent(
      studentID
    );
    const page = parseInt(req.query.page) || 1;
    const offset = (page - 1) * limit;

    const maxPage = computeMaxPage(limit, totalCourses);
    const pageNumbers = computePageNumbers(page, maxPage);

    const learningCourses = await studentCourseModel.getPageCourseOfStudent(
      studentID,
      limit,
      offset
    );

    for (const learningCourse of learningCourses) {
      courses.push(await courseModel.getById(learningCourse.courseID));
    }
    const isLearning = true;
    await getInfoCourse(courses, res);

    res.render("courses/learning", {
      totalCourses,
      courses,
      isLearning,
      pageInfo: {
        current: page,
        isFirst: page === 1,
        isLast: page === maxPage,
        numbers: pageNumbers,
      },
    });
  }

  // [GET] /courses/like?id=
  async like(req, res) {
    const studentID = res.locals.lcAuthUser.id;
    //const studentID = 29;
    const courseID = parseInt(req.query.id);
    let exists = false;

    if (courseID && studentID) {
      const lovedCourses = await studentCourseModel.getCourseStudentLove(
        studentID
      );
      lovedCourses.forEach((lovedCourse) => {
        if (lovedCourse.courseID === courseID) {
          exists = true;
          return;
        }
      });

      // Nếu chưa có thì add
      if (!exists) {
        await studentCourseModel.addLoved({ courseID, studentID });
      }
    }
    res.redirect("back");
  }

  // [GET] /courses/unlike?id=
  async unlike(req, res) {
    const studentID = res.locals.lcAuthUser.id;
    //const studentID = 29;
    const courseID = parseInt(req.query.id);
    let exists = false;

    if (courseID && studentID) {
      const lovedCourses = await studentCourseModel.getCourseStudentLove(
        studentID
      );
      lovedCourses.forEach((lovedCourse) => {
        if (lovedCourse.courseID === courseID) {
          exists = true;
          return;
        }
      });

      // Nếu có thì xóa
      if (exists) {
        await studentCourseModel.removeLoved({ courseID, studentID });
      }
    }
    res.redirect("back");
  }

  //[GET] /courses/watch-list?page=
  async watchList(req, res) {
    // if (res.locals.lcAuthUser) {
    const studentID = res.locals.lcAuthUser.id;
    //const studentID = 29;
    const courses = [];

    const limit = 3;
    const totalCourses = await studentCourseModel.countCourseStudentLove(
      studentID
    );
    const page = parseInt(req.query.page) || 1;
    const offset = (page - 1) * limit;

    const maxPage = computeMaxPage(limit, totalCourses);
    const pageNumbers = computePageNumbers(page, maxPage);

    const lovedCourses = await studentCourseModel.getPageCourseStudentLove(
      studentID,
      limit,
      offset
    );

    for (const lovedCourse of lovedCourses) {
      courses.push(await courseModel.getById(lovedCourse.courseID));
    }
    await getInfoCourse(courses, res);
    const isWatchList = true;

    res.render("courses/watchList", {
      totalCourses,
      courses,
      isWatchList,
      pageInfo: {
        current: page,
        isFirst: page === 1,
        isLast: page === maxPage,
        numbers: pageNumbers,
      },
    });
  }

  // [GET] /courses/search?keyword=
  async search(req, res) {
    const limit = 3;
    const page = parseInt(req.query.page) || 1;
    const offset = (page - 1) * limit;

    const keyWord = req.query.keyword || "";
    let searchOption = parseInt(req.query.searchBy) || 0;
    let sortOption = parseInt(req.query.sortBy) || 0;
    let totalResult;
    let courses;

    switch (searchOption) {
      case 0:
        totalResult = await courseModel.totalResultByName(keyWord);
        switch (sortOption) {
          case 0:
            courses = await courseModel.searchPageByNameOrderNewest(
              keyWord,
              limit,
              offset
            );
            break;
          case 1:
            courses = await courseModel.searchPageByNameMostView(
              keyWord,
              limit,
              offset
            );
            break;
          case 2:
            courses = await courseModel.searchPageByNameOrderHighestRated(
              keyWord,
              limit,
              offset
            );
            break;
          case 3:
            courses = await courseModel.searchPageByNameOrderAscPrice(
              keyWord,
              limit,
              offset
            );
            break;
          case 4:
            courses = await courseModel.searchPageByNameOrderDescPrice(
              keyWord,
              limit,
              offset
            );
            break;
          default:
            courses = await courseModel.searchPageByName(
              keyWord,
              limit,
              offset
            );
            break;
        }
        break;
      case 1:
        totalResult = await courseModel.totalResultByCategory(keyWord);
        switch (sortOption) {
          case 0:
            courses = await courseModel.searchPageByCategoryOrderNewest(
              keyWord,
              limit,
              offset
            );
            break;
          case 1:
            courses = await courseModel.searchPageByCategoryMostView(
              keyWord,
              limit,
              offset
            );
            break;
          case 2:
            courses = await courseModel.searchPageByCategoryOrderHighestRated(
              keyWord,
              limit,
              offset
            );
            break;
          case 3:
            courses = await courseModel.searchPageByCategoryOrderAscPrice(
              keyWord,
              limit,
              offset
            );
            break;
          case 4:
            courses = await courseModel.searchPageByCategoryOrderDescPrice(
              keyWord,
              limit,
              offset
            );
            break;
          default:
            courses = await courseModel.searchPageByCategory(
              keyWord,
              limit,
              offset
            );
            break;
        }
        break;
      default:
        totalResult = 0;
        courses = null;
        break;
    }

    const maxPage = computeMaxPage(limit, totalResult);
    const pageNumbers = computePageNumbers(page, maxPage);

    if (courses !== null) {
      await getInfoCourse(courses, res);
    }

    res.locals.searchOptions.forEach((option) => {
      if (option.value === searchOption) {
        option.isSelected = true;
      } else {
        option.isSelected = false;
      }
    });

    const isCourse = true;
    res.render("courses/search", {
      keyWord,
      sortOption,
      searchOption,
      courses,
      totalResult,
      isEmpty: totalResult === 0,
      pageInfo: {
        current: page,
        isFirst: page === 1,
        isLast: page === maxPage,
        numbers: pageNumbers,
      },
      isCourse,
    });
  }
}

const computeMaxPage = function (limit, total) {
  let maxPage = Math.floor(total / limit);
  if (total % limit) maxPage++;
  return maxPage;
};

const computePageNumbers = function (currentPage, maxPage) {
  const pageNumbers = [];
  if (maxPage !== 1) {
    for (let i = 1; i <= maxPage; i++) {
      if (i === currentPage) {
        pageNumbers.push({ value: i, isActive: true });
      } else {
        pageNumbers.push({ value: i });
      }
    }
  }

  return pageNumbers;
};

const getInfoCourse = async function (courses, res) {
  let learningCourses, lovedCourses;
  // Lấy các khóa học của student
  if (res.locals.lcAuthUser) {
    const studentID = res.locals.lcAuthUser.id;
    // console.log(studentID);
    //const studentID = 29;
    learningCourses = await studentCourseModel.getCourseOfStudent(studentID);
    lovedCourses = await studentCourseModel.getCourseStudentLove(studentID);
  }

  // Lấy 5 khóa học bán chạy nhất trong các khóa học
  const bestSellerCourses = await courseModel.getBestSellerList(5);
  // Lấy 5 khóa học được click nhiều nhất trong các khóa học
  const trendingCourses = await courseModel.getTrendingList(5);

  for (const course of courses) {
    // Thể hiện khóa học đã mua
    if (res.locals.lcAuthUser) {
      learningCourses.forEach((learningCourse) => {
        if (learningCourse.courseID === course.id) {
          course.buyed = true;
        }
      });

      lovedCourses.forEach((lovedCourse) => {
        if (lovedCourse.courseID === course.id) {
          course.loved = true;
        }
      });
    }

    // Lấy trung bình rating của khóa học
    const avgRated = await courseModel.getAvgRate(course.id);
    course.rated = (+avgRated).toFixed(1);

    // Lấy số lượng feedback của khóa học
    const numberRated = await courseModel.getCountFeedback(course.id);
    course.numberRated = (+numberRated).toFixed(0);

    // Lấy tên teacher của khóa học
    const teacher = await userModel.getNameTeacher(course.id);
    course.teacher = teacher;

    // Lấy category của khóa học
    const category = await categoryModel.getById(course.idCategory);

    // Lấy đường dẫn category của khóa học (nếu khóa học thuộc category cấp lĩnh vực 2)
    const linkCategories = [];
    if (category.parentID !== null) {
      const parentCategory = await categoryModel.getById(category.parentID);
      linkCategories.push(parentCategory);
    }
    linkCategories.push(category);
    course.linkCategories = linkCategories;

    // Khóa học nổi bật (được đánh giá nhiều nhất)
    trendingCourses.forEach((element) => {
      if (element.id === course.id) {
        course.trending = true;
      }
    });

    // Khóa học có khuyến mại
    if (course.fee !== course.feeO) {
      course.discount = true;
    }

    // Khóa học nằm trong top 5 khóa học bán chạy nhất
    bestSellerCourses.forEach((element) => {
      if (element.id === course.id) {
        course.bestSeller = true;
      }
    });

    // Khóa học mới được thêm trong 7 ngày
    const now = moment();
    const createTime = moment(course.createTime);
    if (now.diff(createTime, "days") < 7) {
      course.new = true;
    }
  }
};

export default new CourseController();
