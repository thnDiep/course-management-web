const overlay1 = document.querySelector(".check");
const edit = document.querySelector("#edit");
const btnedit = document.querySelector(".btn-edit");
const submit1 = document.querySelectorAll(".input");
const fa_edit = document.querySelectorAll(".fa-edit");
console.log(submit1);
submit1[0].onblur = function () {
  console.log("hel");
  form.submit();
};
overlay1.addEventListener("click", function () {
  console.log("hello");
  overlay1.classList.toggle("overlay");
  edit.style.display = "none";
});
btnedit.addEventListener("click", function () {
  overlay1.classList.toggle("overlay");
  edit.style.display = "block";
});

const faedit = (input, e) => {
  console.log(input);
  input.removeAttribute("disabled");
  input.focus();
};
for (let i = 0; i < fa_edit.length; i++) {
  console.log(i);
  fa_edit[i].addEventListener("click", function (e) {
    faedit(submit1[i], e);
  });
}
