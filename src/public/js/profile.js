const icon = document.querySelectorAll(".Edit");
const editInfor = document.querySelector(".btnEdit");

const nameInput = document.querySelector(".inputName");
const emailInput = document.querySelector(".inputEmail");
const passInput = document.querySelector(".inputPass");
const newPassInput = document.querySelector(".rowNewPass");
const input = document.querySelectorAll(".input");

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
  passInput.value = "";
  edit(passInput, e);
});
console.log(input);
editInfor.addEventListener("click", function (e) {
  console.log(input[0].value);
  input.forEach((element) => {
    element.removeAttribute("disabled");
    console.log(element.value.length);
    if (element.value.length === 0) {
      element.classList.toggle("border");
      e.preventDefault();
    }
  });
});
input.forEach((element) => {
  element.oninput = (e) => {
    element.classList.remove("border");
  };
});

function update() {}
