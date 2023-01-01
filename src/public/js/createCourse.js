tinymce.init({
  selector: "textarea",
  menubar: false,
  plugins: "paste image link autolink lists table media",
  toolbar: [
    "undo redo | bold italic underline strikethrough | numlist bullist | alignleft aligncenter alignright| forecolor backcolor | table link image media",
  ],
});
$("#fuMain").fileinput({
  maxFileCount: 1,
  theme: "fa5",
  allowedFileExtensions: ["mp4", "avi", "ogg", "wmv", "flv"],
  showRemove: false,
  showUpload: false,
});
$("#fuSub").fileinput({
  dropZoneEnabled: false,
  maxFileCount: 1,
  theme: "fa5",
  allowedFileExtensions: ["jpg", "png", "gif"],
  browseOnZoneClick: false,
  showRemove: false,
  showUpload: false,
  browseOnZoneClick: true,
});
const currency = document.querySelector("#currency-field");
const field = document.querySelectorAll(".input");
const formatter = new Intl.NumberFormat("vi-VN", {
  style: "currency",
  currency: "VND",
  //minimumFractionDigits: 2
});
const currencyFormat = /-?\d+(?:\.\d+)?(?=VND\b)/;

field[0].onblur = function () {
  myFunction(field[0], "subLabel-title");
};
field[1].onblur = function () {
  console.log(field[1]);
  myFunction(field[1], "subLabel-summary");
};
currency.onblur = function () {
  myFunction2(currency, "subLabel-price");
};
function myFunction(index, label) {
  if (index.value.length === 0) {
    document.querySelector(`.${label}`).classList.remove("hidden");
  } else {
    document.querySelector(`.${label}`).classList.add("hidden");
  }
}

function myFunction2(index, label) {
  if (index.value.length === 0) {
    document.querySelector(`.${label}`).classList.remove("hidden");
  } else {
    document.querySelector(`.${label}`).classList.add("hidden");
  }

  if (!currency.value.match(currencyFormat)) {
    document.querySelector("#currency-field").value = formatter.format(
      document.querySelector("#currency-field").value
    );
  }
}
