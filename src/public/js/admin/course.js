// check box delete course
const deleteBtnCourse = document.querySelector(".multiDeleteCourse");
const checkboxAllCourse = document.getElementById("checkboxAllCourse");
const checkboxsCourse = document.querySelectorAll(".checkboxCourse");

function renderSubmitDeleteBtnCourse() {
  let checkedNumber = $("input[name='idCourses']:checked").length;
  if (checkedNumber > 0) {
    deleteBtnCourse.classList.remove("btn--disabled");
    deleteBtnCourse.disabled = false;
  } else {
    deleteBtnCourse.classList.add("btn--disabled");
    deleteBtnCourse.disabled = true;
  }
}

checkboxAllCourse.onchange = (e) => {
  checkboxsCourse.forEach((checkbox) => {
    if (!checkbox.disabled) {
      checkbox.checked = e.target.checked;
    }
  });

  renderSubmitDeleteBtnCourse();
};

checkboxsCourse.forEach((checkbox) => {
  checkbox.onchange = (e) => {
    const checked = document.querySelectorAll(
      "input[name='idCourses']:checked"
    );
    const enabled = document.querySelectorAll(
      "input[name='idCourses']:enabled"
    );

    const isCheckedAll = enabled.length === checked.length;
    checkboxAllCourse.checked = isCheckedAll;
    renderSubmitDeleteBtnCourse();
  };
});

// Confirm delete course
let idCourse;
const deleteCourseForm = document.forms["deleteCourseForm"];

$("#deleteCourseModal").on("show.bs.modal", function (event) {
  const button = $(event.relatedTarget);
  idCourse = button.data("id");
});

$("#deleteCourseBtn").on("click", () => {
  deleteCourseForm.action = "/admin/courses?id=" + idCourse + "&_method=DELETE";
  deleteCourseForm.submit();
});
