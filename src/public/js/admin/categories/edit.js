// Show row when add
const template = document.getElementById("templateFormAdd").innerHTML;
$("#addChildCategory").on("click", (e) => {
  e.preventDefault();
  $("#addChildCategory").off("click");
  $("#childCategoryTable tr:last").after(template);

  $(".form-addChildInput").focus();

  // add category
  const addCategoryForm = document.getElementById("addCategoryForm");
  const addCategoryBtn = document.getElementById("addCategoryBtn");
  addCategoryBtn.onclick = function (e) {
    const addNameInput = document.getElementById("addName");
    const nameValue = addNameInput.value.trim();
    if (nameValue.length === 0) {
      // formGroup.classList.add("invalid");
      // formMsg.innerText = "Please fill category name";
      console.log("trung ten");
    } else {
      $.getJSON(
        `/admin/categories/add/is-available?name=${nameValue}`,
        function (data) {
          if (data === false) {
            $("#failedAddModel").modal("show");
          } else {
            const parentID = document.getElementById("id");
            addCategoryForm.action = `/admin/categories/addChild?name=${addNameInput.value}&parentID=${parentID.value}`;
            addCategoryForm.submit();
          }
        }
      );
    }
  };
});

// check box delete category
const deleteBtnCategory = document.querySelector(".multiDeleteCategory");
const checkboxAllCategory = document.getElementById("checkboxAllCategory");
const checkboxsCategory = document.querySelectorAll(".checkboxCategory");

function renderSubmitDeleteBtnCategory() {
  let checkedNumber = $("input[name='idCategories']:checked").length;
  if (checkedNumber > 0) {
    deleteBtnCategory.classList.remove("btn--disabled");
    deleteBtnCategory.disabled = false;
  } else {
    deleteBtnCategory.classList.add("btn--disabled");
    deleteBtnCategory.disabled = true;
  }
}

checkboxAllCategory.onchange = (e) => {
  checkboxsCategory.forEach((checkbox) => {
    if (!checkbox.disabled) {
      checkbox.checked = e.target.checked;
    }
  });

  renderSubmitDeleteBtnCategory();
};

checkboxsCategory.forEach((checkbox) => {
  checkbox.onchange = (e) => {
    const checked = document.querySelectorAll(
      "input[name='idCategories']:checked"
    );
    const enabled = document.querySelectorAll(
      "input[name='idCategories']:enabled"
    );

    const isCheckedAll = enabled.length === checked.length;
    checkboxAllCategory.checked = isCheckedAll;
    renderSubmitDeleteBtnCategory();
  };
});

// Confirm delete category
let idCategory;
const deleteCategoryForm = document.forms["deleteCategoryForm"];

$("#deleteCategoryModal").on("show.bs.modal", function (event) {
  const button = $(event.relatedTarget);
  idCategory = button.data("id");
});

$("#deleteCategoryBtn").on("click", () => {
  deleteCategoryForm.action =
    "/admin/categories?id=" + idCategory + "&_method=DELETE";
  deleteCategoryForm.submit();
});

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
