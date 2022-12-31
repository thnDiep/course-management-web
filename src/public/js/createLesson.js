const overlay1 = document.querySelector(".check");
const overlay2 = document.querySelector(".check2");

const btnAddLesson = document.querySelector(".btnAddLesson");
const btnAddChapter = document.querySelector(".addChapterBtn");
const formLessonAdded = document.querySelector(".lesson");
const formChapterAdded = document.querySelector(".chapter");

const check_Course = document.querySelector(".formCourse_title");
const check_Chapter = document.querySelector(".chapter__title");
check_Course.addEventListener("click", function () {
  document.querySelector(".course-icon").classList.toggle("down-icon");
  document.querySelector(".course-icon").classList.toggle("up-icon");
});
check_Chapter.addEventListener("click", function () {
  console.log("hell");
  document.querySelector(".chapter-icon").classList.toggle("down-icon");
  document.querySelector(".chapter-icon").classList.toggle("up-icon");
});
// for (let i = 1; i <= check.length; i++) {
//   $(`#course${i}`).on("show.bs.collapse", function () {
//     document.querySelector(".formCourse_icon").style.transform =
//       "rotate(-180deg)";
//     // do something…
//   });
//   $(`#course${i}`).on("hide.bs.collapse", function () {
//     document.querySelector(".formCourse_icon").style.transform = "rotate(0deg)";
//     // do something…
//   });
// }

overlay1.addEventListener("click", function () {
  overlay1.classList.toggle("overlay");
  formLessonAdded.style.display = "none";
});

const editLayer = () => {
  overlay1.classList.toggle("overlay");
  formLessonAdded.style.display = "block";
};

btnAddLesson.addEventListener("click", editLayer);

overlay2.addEventListener("click", function () {
  overlay2.classList.toggle("overlay");
  formChapterAdded.style.display = "none";
});
const editLayer2 = () => {
  overlay2.classList.toggle("overlay");
  formChapterAdded.style.display = "block";
};

btnAddChapter.addEventListener("click", editLayer2);
