// Checkbox
const checkboxAll = document.getElementById("checkboxAll");
const checkboxs = document.querySelectorAll(".checkboxCourse");
const deleteBtn = document.querySelector(".submitDeleteByCheckBox");

function renderSubmitDeleteBtn() {
  let checkedNumber = $("input[name='idCourses']:checked").length;
  if (checkedNumber > 0) {
    deleteBtn.classList.remove("btn--disabled");
    deleteBtn.disabled = false;
  } else {
    deleteBtn.classList.add("btn--disabled");
    deleteBtn.disabled = true;
  }
}

checkboxAll.onchange = (e) => {
  checkboxs.forEach((checkbox) => {
    checkbox.checked = e.target.checked;
  });

  renderSubmitDeleteBtn();
};

checkboxs.forEach((checkbox) => {
  checkbox.onchange = (e) => {
    const isCheckedAll =
      checkboxs.length === $("input[name='idCourses']:checked").length;
    checkboxAll.checked = isCheckedAll;
    renderSubmitDeleteBtn();
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
