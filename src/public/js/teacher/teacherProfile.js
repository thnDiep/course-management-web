const input = document.querySelectorAll(".text-muted")
const submit = document.querySelector(".submit")
const nameformat = /^[a-zA-Z]{4,}(?: [a-zA-Z]+){0,2}$/;
const mailformat =
  /^[a-z][a-z0-9_\.]{5,32}@[a-z0-9]{2,}(\.[a-z0-9]{2,4}){1,2}$/;
const profileImageForm = document.forms["profileImageForm"];

submit.addEventListener("click", function (e) {
  input.forEach(element => {
    if (element.value.length === 0) {
      element.style.border = '1px solid red'
      element.previousElementSibling.classList.remove("hidden")
      e.preventDefault();
    }
  });
  console.log(input[0].value)
  if (!input[0].value.match(nameformat)) {
    input[0].style.border = '1px solid red'
    input[0].previousElementSibling.classList.remove("hidden")
    e.preventDefault();
  }
  if (!input[1].value.match(mailformat)) {
    input[1].style.border = '1px solid red'
    input[1].previousElementSibling.classList.remove("hidden")
    e.preventDefault();
  }
  if (input[4].value !== input[3].value) {
    input[4].style.border = '1px solid red'
    input[4].previousElementSibling.classList.remove("hidden")
    e.preventDefault();
  }

})
input.forEach(element => {
  element.oninput = (e) => {
    element.style.border = '1px solid #000'
    element.previousElementSibling.classList.add("hidden")

  }
  element.onblur = (e) => {
    if (element.value.length === 0) {
      element.style.border = '1px solid red'
      element.previousElementSibling.classList.remove("hidden")
    }
  }
})

$('#file').change(function (e) {
  profileImageForm.action =
    "/teacher/profile/image/" + "?_method=PUT";
  profileImageForm.submit();
})
const deleteChapterForm = document.forms["deleteChapterForm"];
const deleteChapter = document.querySelector(".deleteChapter")
deleteChapter?.addEventListener("click", function (e) {
  id = deleteChapter.getAttribute("data-id");
  deleteChapterForm.action =
    "/teacher/course/chapter?id=" + id + "&_method=DELETE";
  deleteChapterForm.submit();
})

const deleteLessonForm = document.forms["deleteLessonForm"];
const deleteLesson = document.querySelector(".deleteLesson")
deleteLesson.addEventListener("click", function (e) {
  id = deleteLesson.getAttribute("data-id");
  deleteLessonForm.action =
    "/teacher/course/lesson?id=" + id + "&_method=DELETE";
  deleteLessonForm.submit();
})