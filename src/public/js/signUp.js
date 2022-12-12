const name = document.querySelector(".formSignUp__user-name__input");
const email = document.querySelector(".formSignUp__user-email__input");
const pass = document.querySelector(".formSignUp__user-pass__input");
const btn = document.querySelector(".formSignUp__btn");
const reqMail = document.querySelector(".required-email");
const video = document.querySelector(".plyr__video");

const mailformat =
  /^[a-z][a-z0-9_\.]{5,32}@[a-z0-9]{2,}(\.[a-z0-9]{2,4}){1,2}$/;
const nameformat = /^[A-Za-z][A-Za-z0-9_]{7,29}$/;
video.playbackRate = 0.5;

const submit = (e) => {
  e.preventDefault();
  if (name.value.length === 0) {
    document.querySelector(".required-name").classList.remove("hidden");
  } else if (!name.value.match(nameformat)) {
    document.querySelector(".required-name").classList.remove("hidden");
    document.querySelector(".required-name").textContent =
      "Invalid name format. Please format again !";
  } else {
    document.querySelector(".required-name").classList.add("hidden");
  }

  if (email.value.length === 0) {
    document.querySelector(".required-email").classList.remove("hidden");
  } else if (!email.value.match(mailformat)) {
    document.querySelector(".required-email").classList.remove("hidden");
    document.querySelector(".required-email").textContent =
      "Invalid email format. Please format again !";
  } else {
    document.querySelector(".required-email").classList.add("hidden");
  }

  if (pass.value.length === 0) {
    document.querySelector(".required-pass").classList.remove("hidden");
  } else {
    document.querySelector(".required-pass").classList.add("hidden");
  }
};
btn.addEventListener("click", submit);
