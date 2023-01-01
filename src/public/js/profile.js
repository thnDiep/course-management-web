const icon = document.querySelectorAll(".Edit");
const editInfor = document.querySelectorAll(".btnEdit");

const nameInput = document.querySelector(".inputName");
const emailInput = document.querySelector(".inputEmail");
const passInput = document.querySelector(".inputPass");
const newPassInput = document.querySelector(".rowNewPass");

const pageEdit = document.querySelector("#edit");
const overlay1 = document.querySelector(".check");

const edit = (input, e) => {
  input.removeAttribute("disabled");
  input.focus();
};
icon[0].addEventListener("click", function (e) {
  edit(nameInput, e);
});
icon[1].addEventListener("click", function (e) {
  edit(emailInput, e);
});
icon[2].addEventListener("click", function (e) {
  newPassInput.classList.remove("hidden");
  passInput.value = "";
  edit(passInput, e);
});

function update() {}
