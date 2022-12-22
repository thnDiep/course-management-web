const icon = document.querySelectorAll(".Edit");
const iconLayer = document.querySelectorAll(".editPage");
const nameInput = document.querySelector(".inputName");
const emailInput = document.querySelector(".inputEmail");
const passInput = document.querySelector(".inputPass");

const nameLayer = document.querySelector(".nameInput");
const passLayer = document.querySelector(".passInput");
const emailLayer = document.querySelector(".emailInput");

const pageEdit = document.querySelector("#edit");
const overlay1 = document.querySelector(".check");

const edit = (input, e) => {
  input.removeAttribute("disabled");
  input.focus();
};
iconLayer[0].addEventListener("click", function (e) {
  edit(nameLayer, e);
});
iconLayer[1].addEventListener("click", function (e) {
  edit(emailLayer, e);
});
iconLayer[2].addEventListener("click", function (e) {
  edit(passLayer, e);
});

overlay1.addEventListener("click", function () {
  overlay1.classList.toggle("overlay");
  pageEdit.style.display = "none";
});
const editLayer = (e) => {
  overlay1.classList.toggle("overlay");
  pageEdit.style.display = "block";
};

icon[0].addEventListener("click", function (e) {
  editLayer(e);
});
icon[1].addEventListener("click", function (e) {
  editLayer(e);
});
icon[2].addEventListener("click", function (e) {
  editLayer(e);
});