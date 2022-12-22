const formGroup = document.querySelector(".form-group");
const formMsg = document.querySelector(".form-message");
const nameInput = document.getElementById("name");
const myModel = document.getElementById("#failedAddModel");
let nameValue;

$("#formAddCategory").on("submit", (e) => {
  e.preventDefault();
  nameValue = nameInput.value.trim();

  if (nameValue.length === 0) {
    formGroup.classList.add("invalid");
    formMsg.innerText = "Please fill category name";
    nameInput.focus();
  } else {
    $.getJSON(
      `/admin/categories/add/is-available?name=${nameValue}`,
      function (data) {
        if (data === false) {
          $("#failedAddModel").modal("show");
        } else {
          $("#formAddCategory").off("submit").submit();
        }
      }
    );
  }
});

nameInput.oninput = function (e) {
  formGroup.classList.remove("invalid");
  formMsg.innerText = "";
};

nameInput.onblur = function (e) {
  nameValue = nameInput.value.trim();
  if (nameValue.length === 0) {
    formGroup.classList.add("invalid");
    formMsg.innerText = "Please fill category name";
    nameInput.focus();
  }
};
