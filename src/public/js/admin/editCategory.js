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
