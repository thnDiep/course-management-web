// Checkbox
const checkboxAll = document.getElementById("checkboxAll");
const checkboxs = document.querySelectorAll(".checkboxCategory");
const deleteBtn = document.querySelector(".submitDeleteByCheckBox");

function renderSubmitDeleteBtn() {
  let checkedNumber = $("input[name='idCategories']:checked").length;
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
      checkboxs.length === $("input[name='idCategories']:checked").length;
    checkboxAll.checked = isCheckedAll;
    renderSubmitDeleteBtn();
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
