const sidebar_button = document.querySelector(".sidebar1__search");
const overlay = document.querySelector(".overlay");
if (sidebar_button != null) {
  sidebar_button.addEventListener("click", function () {
    const overlay = document.querySelector(".overlay");

    if (overlay !== null) {
      overlay.remove();
      document.querySelector(".header").classList.toggle("show");
    } else {
      document.querySelector(".header").classList.toggle("show");
      const html = '<div onclick="myFunction()" class="overlay"></div>';
      document
        .querySelector(".container-fluid")
        .insertAdjacentHTML("beforebegin", html);
    }
  });
  function myFunction() {
    document.querySelector(".overlay").remove();
    document.querySelector(".header").classList.toggle("show");
  }
}
