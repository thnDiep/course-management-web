const overlay1 = document.querySelector(".check");
const overlay2 = document.querySelector(".check2");

const btnAddLesson = document.querySelector(".btnAddLesson");
const btnAddChapter = document.querySelector(".addChapterBtn");
const formLessonAdded= document.querySelector(".lesson");
const formChapterAdded = document.querySelector(".chapter");


overlay1.addEventListener("click", function () {
    overlay1.classList.toggle("overlay");
    formLessonAdded.style.display = "none";
  });
  
const editLayer = () => {
    overlay1.classList.toggle("overlay");
    formLessonAdded.style.display = "block";
  };
  
  btnAddLesson.addEventListener("click",editLayer);

  overlay2.addEventListener("click", function () {
    overlay2.classList.toggle("overlay");
    formChapterAdded.style.display = "none";
  });
  const editLayer2 = () => {
    overlay2.classList.toggle("overlay");
    formChapterAdded.style.display = "block";
  };
  
btnAddChapter.addEventListener("click",editLayer2);
  