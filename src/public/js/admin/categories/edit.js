// Show row when add
$("#addChildCategory").on("click", (e) => {
  e.preventDefault();
  $("#addChildCategory").off("click");
  $("#childCategoryTable tr:last").after(`
      <tr>
        <td></td>
        <td></td>
        <td>
          <input
            class="form-addChildInput"
            type="text"
            id="name"
            name="name"
          />
        </td>
        <td></td> 
        <td class="d-flex">
          <a href="" class="d-flex mr-5 link--success">
            <i class="fa fa-plus mr-2" aria-hidden="true"></i>
            add
          </a>

          <a href="" class="d-flex link--danger">
            <i class="fa fa-window-close mr-2" aria-hidden="true"></i>
            cancel
          </a>
        </td>
      </tr>
    `);

  $(".form-addChildInput").focus();
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
    if(!checkbox.disabled){
      checkbox.checked = e.target.checked;
    }
  });

  renderSubmitDeleteBtnCategory();
};

checkboxsCategory.forEach((checkbox) => {
  checkbox.onchange = (e) => {
    const checked = document.querySelectorAll("input[name='idCategories']:checked");
    const enabled = document.querySelectorAll("input[name='idCategories']:enabled");
    
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
    if(!checkbox.disabled){
      checkbox.checked = e.target.checked;
    }
  });

  renderSubmitDeleteBtnCourse();
};

checkboxsCourse.forEach((checkbox) => {
  checkbox.onchange = (e) => {
    const checked = document.querySelectorAll("input[name='idCourses']:checked");
    const enabled = document.querySelectorAll("input[name='idCourses']:enabled");
    
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
