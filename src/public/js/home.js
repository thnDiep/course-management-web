var swiper = new Swiper(".swiper-container", {
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
});
const love = document.querySelectorAll(".love");
const submit = (e) => {
  document.querySelectorAll(".love").classList.add("btn-love");
  document.querySelectorAll(".fa-heart").classList.add("active");
};
love[0].addEventListener("click", submit);
love[1].addEventListener("click", submit);
