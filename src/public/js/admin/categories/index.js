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
