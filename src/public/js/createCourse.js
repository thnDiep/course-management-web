const currency = document.querySelector("#currency-field");
const field = document.querySelectorAll(".input");
const formatter = new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
    //minimumFractionDigits: 2
  })
const currencyFormat = /-?\d+(?:\.\d+)?(?=VND\b)/;

field[0].onblur = function () {
    myFunction(field[0],"subLabel-title")
};
field[1].onblur = function () {
    console.log(field[1])
    myFunction(field[1],"subLabel-summary")
};
currency.onblur = function () {
    myFunction2(currency,"subLabel-price")
};
function myFunction(index,label) {
    if(index.value.length === 0){
        document.querySelector(`.${label}`).classList.remove("hidden");
    }
    else{
        document.querySelector(`.${label}`).classList.add("hidden");
    }
  };

  function myFunction2(index,label) {
    if(index.value.length === 0){
        document.querySelector(`.${label}`).classList.remove("hidden");
    }
    else{
        document.querySelector(`.${label}`).classList.add("hidden");
    }

    if (!currency.value.match(currencyFormat)) {
        document.querySelector("#currency-field").value =
          formatter.format(document.querySelector("#currency-field").value);
      }

  };


