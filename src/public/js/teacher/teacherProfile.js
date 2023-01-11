const input = document.querySelectorAll(".text-muted");
const submit = document.querySelector(".submit");
const mailformat =
  /^[a-z][a-z0-9_\.]{5,32}@[a-z0-9]{2,}(\.[a-z0-9]{2,4}){1,2}$/;
const profileImageForm = document.forms["profileImageForm"];
const passformat = /^[A-Za-z]\w{5,14}$/;
const nameformat = /^[A-Z][a-zA-Z]{2,}(?: [A-Z][a-zA-Z]*){0,3}$/;

submit.addEventListener("click", function (e) {
  if (input[2].value.length === 0) {
    input[2].style.border = "1px solid red";
    input[2].previousElementSibling.classList.remove("hidden");
    e.preventDefault();
  } else {
    if (!input[0].value.match(nameformat) && input[0].value.length !== 0) {
      input[0].style.border = "1px solid red";
      input[0].previousElementSibling.classList.remove("hidden");
      e.preventDefault();
    }
    if (!input[1].value.match(mailformat) && input[1].value.length !== 0) {
      input[1].style.border = "1px solid red";
      input[1].previousElementSibling.classList.remove("hidden");
      e.preventDefault();
    }
    if (!input[3].value.match(passformat) && input[3].value.length !== 0) {
      input[3].style.border = "1px solid red";
      input[3].previousElementSibling.classList.remove("hidden");
      e.preventDefault();
    }
    if (input[3].value.length !== 0) {
      if (!input[4].value.match(input[3].value)) {
        input[4].style.border = "1px solid red";
        input[4].previousElementSibling.classList.remove("hidden");
        e.preventDefault();
      }
    }
    if (!input[4].value.match(input[3].value) && input[4].value.length !== 0) {
      input[4].style.border = "1px solid red";
      input[4].previousElementSibling.classList.remove("hidden");
      e.preventDefault();
    }
  }
  if (input[0].value.length === 0) {
    input[0].style.border = "1px solid red";
    input[0].previousElementSibling.classList.remove("hidden");
    e.preventDefault();
  }
  if (input[1].value.length === 0) {
    input[1].style.border = "1px solid red";
    input[1].previousElementSibling.classList.remove("hidden");
    e.preventDefault();
  }
});
input[0].oninput = () => {
  if (!input[0].value.match(nameformat)) {
    input[0].style.border = "1px solid red";
    input[0].previousElementSibling.classList.remove("hidden");
  } else {
    input[0].style.border = "1px solid #000";
    input[0].previousElementSibling.classList.add("hidden");
  }
};
input[1].oninput = () => {
  if (!input[1].value.match(mailformat)) {
    input[1].style.border = "1px solid red";
    input[1].previousElementSibling.classList.remove("hidden");
  } else {
    input[1].style.border = "1px solid #000";
    input[1].previousElementSibling.classList.add("hidden");
  }
};
input[3].oninput = () => {
  if (!input[3].value.match(passformat)) {
    input[3].style.border = "1px solid red";
    input[3].previousElementSibling.classList.remove("hidden");
  } else {
    input[3].style.border = "1px solid #000";
    input[3].previousElementSibling.classList.add("hidden");
  }
};
input[4].oninput = () => {
  if (!input[4].value.match(input[3].value)) {
    input[4].style.border = "1px solid red";
    input[4].previousElementSibling.classList.remove("hidden");
  } else {
    input[4].style.border = "1px solid #000";
    input[4].previousElementSibling.classList.add("hidden");
  }
};

input.forEach((element) => {
  element.onblur = (e) => {
    if (element.value.length === 0) {
      element.style.border = "1px solid #000";
      element.previousElementSibling.classList.add("hidden");
    }
  };
});

$("#file").change(function (e) {
  profileImageForm.action = "/teacher/profile/image/" + "?_method=PUT";
  profileImageForm.submit();
});
const deleteChapterForm = document.forms["deleteChapterForm"];
const deleteChapter = document.querySelector(".deleteChapter");
deleteChapter?.addEventListener("click", function (e) {
  id = deleteChapter.getAttribute("data-id");
  deleteChapterForm.action =
    "/teacher/course/chapter?id=" + id + "&_method=DELETE";
  deleteChapterForm.submit();
});

const deleteLessonForm = document.forms["deleteLessonForm"];
const deleteLesson = document.querySelector(".deleteLesson");
deleteLesson?.addEventListener("click", function (e) {
  id = deleteLesson.getAttribute("data-id");
  deleteLessonForm.action =
    "/teacher/course/lesson?id=" + id + "&_method=DELETE";
  deleteLessonForm.submit();
});
