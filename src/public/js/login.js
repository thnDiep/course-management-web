const name = document.querySelector(".form--login__user-name__input");
const pass = document.querySelector(".form--login__user-pass__input");
const btn = document.querySelector(".form--login__btn");
const video = document.querySelector(".plyr__video");
const nameformat = /^[A-Za-z][A-Za-z0-9_]{7,29}$/;
video.playbackRate = 0.5;
const submit = (e) => {
  if (name.value.length === 0) {
    document.querySelector(".required-name").classList.remove("hidden");
  } else if (!name.value.match(nameformat)) {
    document.querySelector(".required-name").classList.remove("hidden");
    document.querySelector(".required-name").textContent =
      "Invalid name format. Please format again !";
  } else {
    document.querySelector(".required-name").classList.add("hidden");
  }

  if (pass.value.length === 0) {
    document.querySelector(".required-pass").classList.remove("hidden");
  } else {
    document.querySelector(".required-pass").classList.add("hidden");
  }
};
btn.addEventListener("click", submit);
