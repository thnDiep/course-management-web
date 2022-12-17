// const togglePassword = document.querySelector("#togglePassword");
// const password = document.querySelector(".password");

// togglePassword.addEventListener("click", function (e) {
//   const type =
//     password.getAttribute("type") === "password" ? "text" : "password";
//   password.setAttribute("type", type);
//   // toggle the eye slash icon
//   this.classList.toggle("fa-eye-slash");
// });

// const h1 = document.querySelector(".changeText");
// h1.textContent={{this.profiles.names}};

const icon = document.querySelectorAll(".edit");
const nameInput = document.querySelector(".inputName");
const emailInput = document.querySelector(".inputEmail");
const passInput = document.querySelector(".inputPass");

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
  edit(passInput, e);
});
