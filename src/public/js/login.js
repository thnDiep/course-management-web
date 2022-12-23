const name = document.querySelector(".form--login__user-name__input");
const pass = document.querySelector(".form--login__user-pass__input");
const btn = document.querySelector(".form--login__btn");
const video = document.querySelector(".plyr__video");

const rPass =document.querySelector(".required-pass");
const rName = document.querySelector(".required-name");
const nameformat = /^[A-Za-z][A-Za-z0-9_]{7,29}$/;
video.playbackRate = 0.5;
const submit = (e) => {
  if (pass.value.length === 0) {
    rPass.innerHTML =
      "<i class='fas fa-exclamation-circle required-icon' style='color:red'></i> Password is required";
      e.preventDefault();
    } else  {
    rPass.innerHTML =""
  }

  if (name.value.length === 0) {
    rName.innerHTML =
    "<i class='fas fa-exclamation-circle required-icon' style='color:red'></i> User name is required";
     e.preventDefault();

   } 
  else if (!name.value.match(nameformat)) {
    rName.innerHTML =
      "<i class='fas fa-exclamation-circle required-icon' style='color:red'></i> Please match the requested format.";
      e.preventDefault();
  } 
  else {
    rName.innerHTML =""
  }
};
btn.addEventListener("click", submit);
