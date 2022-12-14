const overlay1 = document.querySelector(".check");
const edit = document.querySelector("#edit");
const btnedit = document.querySelector(".btn-edit");

overlay1.addEventListener("click", function () {
    console.log("hello");
    overlay1.classList.toggle("overlay");
    edit.style.display = "none";
});
btnedit.addEventListener("click", function () {
    overlay1.classList.toggle("overlay");
    edit.style.display = "block";
});