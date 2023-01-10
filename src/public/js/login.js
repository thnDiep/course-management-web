const email = document.querySelector(".form--login__user-email__input");
const pass = document.querySelector(".form--login__user-pass__input");
const btn = document.querySelector(".form--login__btn");
const video = document.querySelector(".plyr__video");

const rPass = document.querySelector(".required-pass");
const rEmail = document.querySelector(".required-email");
const mailformat =
  /^[a-z][a-z0-9_\.]{5,32}@[a-z0-9]{2,}(\.[a-z0-9]{2,4}){1,2}$/;
const passformat = /^[A-Za-z]\w{5,14}$/;

video.playbackRate = 0.5;

// Xử lý các form khi blur + input
email.oninput = (e) => {
  rEmail.innerHTML = "";
};
email.onblur = (e) => {
  console.log(email.value.length);
  if (email.value.length === 0) {
    rEmail.innerHTML = "Please fill out this field";
  }
};
pass.oninput = (e) => {
  rPass.innerHTML = "";
};
pass.onblur = (e) => {
  console.log(pass.value.length);
  if (pass.value.length === 0) {
    rPass.innerHTML = "Please fill out this field";
  }
};

// Xử lý form validate
const submit = (e) => {
  if (pass.value.length === 0) {
    rPass.innerHTML =
      "<i class='fas fa-exclamation-circle required-icon' style='color:red'></i> Password is required";
    e.preventDefault();
  } else {
    rPass.innerHTML = "";
  }

  if (email.value.length === 0) {
    rEmail.innerHTML =
      "<i class='fas fa-exclamation-circle required-icon' style='color:red'></i> Email is required";
    e.preventDefault();
  } else if (!email.value.match(mailformat)) {
    rEmail.innerHTML =
      "<i class='fas fa-exclamation-circle required-icon' style='color:red'></i> Please match the requested format.";
    e.preventDefault();
  } else {
    rEmail.innerHTML = "";
  }
};
btn.addEventListener("click", submit);
