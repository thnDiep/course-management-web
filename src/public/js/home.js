const prev1 = document.querySelector(".slider__prev");
const next1 = document.querySelector(".slider__next");

let counter = 1;

setInterval(function () {
  document.getElementById("radio" + counter).checked = true;
  counter++;

  if (counter > 4) {
    counter = 1;
  }
}, 5000);
const moveSlider = function (check) {
  if (document.getElementById("radio" + check).checked === true) {
    return;
  } else {
    for (let i = 1; i < 5; i++) {
      if (document.getElementById("radio" + i).checked === true) {
        i = check === 1 ? --i : ++i;
        document.getElementById("radio" + i).checked = true;
        return;
      }
    }
  }
};
prev1.addEventListener("click", function () {
  moveSlider(1);
});
next1.addEventListener("click", function () {
  moveSlider(4);
});
