tinymce.init({
  selector: "#textarea",
  menubar: false,
  //plugins: "paste image link autolink lists table media",
  plugins: ["image", "code", "table", "link", "media", "codesample"],
  toolbar: [
    "undo redo | bold italic underline strikethrough | numlist bullist | alignleft aligncenter alignright| forecolor backcolor | table link image media codesample",
  ],
  codesample_languages: [
    { text: "HTML/XML", value: "markup" },
    { text: "JavaScript", value: "javascript" },
    { text: "CSS", value: "css" },
    { text: "PHP", value: "php" },
    { text: "Ruby", value: "ruby" },
    { text: "Python", value: "python" },
    { text: "Java", value: "java" },
    { text: "C", value: "c" },
    { text: "C#", value: "csharp" },
    { text: "C++", value: "cpp" },
  ],
});
$("#fuMain").fileinput({
  dropZoneEnabled: true,
  maxFileCount: 1,
  theme: "fa5",
  allowedFileExtensions: ["mp4", "avi", "ogg", "wmv", "flv"],
  showRemove: true,
  showUpload: false,
  fileActionSettings: { showZoom: false },
});
$("#fuSub").fileinput({
  dropZoneEnabled: false,
  maxFileCount: 1,
  theme: "fa5",
  allowedFileExtensions: ["jpg", "png", "gif"],
  browseOnZoneClick: false,
  showRemove: true,
  showCancel: false,
  showUpload: false,
  browseOnZoneClick: true,
  fileActionSettings: { showZoom: false },
});

const currency = document.querySelector("#currency-field");
const field = document.querySelectorAll(".input");
const btnSubmit = document.querySelector(".btnCreate");
const formatter = new Intl.NumberFormat("vi-VN", {
  style: "currency",
  currency: "VND",
});
if (document.getElementById("currencyO") !== null)
  formatCurrency($("#currencyO"));
if (document.getElementById("currency1") !== null)
  formatCurrency($("#currency1"));
$("input[data-type='currency']").on({
  keyup: function () {
    formatCurrency($(this));
  },
  blur: function () {
    formatCurrency($(this), "blur");
  },
});

// Thêm , cho số tiền
function formatNumber(n) {
  // format number 1000000 to 1,234,567
  return n.replace(/\D/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function formatCurrency(input) {
  // appends đ to value, validates decimal side
  // and puts cursor back in right position.

  // get input value
  var input_val = input.val();

  // don't validate empty input
  if (input_val === "") {
    return;
  }

  // original length
  var original_len = input_val.length;

  // initial caret position
  var caret_pos = input.prop("selectionStart");

  // check for decimal
  if (input_val.indexOf(".") >= 0) {
    // get position of first decimal
    // this prevents multiple decimals from
    // being entered
    var decimal_pos = input_val.indexOf(".");

    // split number by decimal point
    var left_side = input_val.substring(0, decimal_pos);
    var right_side = input_val.substring(decimal_pos);

    // add commas to left side of number
    left_side = formatNumber(left_side);

    // validate right side
    right_side = formatNumber(right_side);

    // Limit decimal to only 2 digits
    right_side = right_side.substring(0, 2);

    // join number by .
    input_val = "đ" + left_side + "." + right_side;
  } else {
    // no decimal entered
    // add commas to number
    // remove all non-digits
    input_val = formatNumber(input_val);
    input_val = "đ" + input_val;

    // final formatting
    // if (blur === "blur") {
    //   input_val += ".00";
    // }
  } // send updated string to input
  input.val(input_val);

  // put caret back in the right position
  var updated_len = input_val.length;
  caret_pos = updated_len - original_len + caret_pos;
  input[0].setSelectionRange(caret_pos, caret_pos);
}

const input = document.querySelectorAll(".inputField");
const input1 = document.querySelectorAll(".inputFieldMini");
const input2 = document.getElementById("fuSub");
const input3 = document.getElementById("fuMain");

input.forEach((element) => {
  element.oninput = (e) => {
    element.previousElementSibling.children[1].textContent = "";
  };
});
input1.forEach((element) => {
  element.oninput = (e) => {
    element.style.border = "1px solid black";
  };
});
input2.onchange = (e) => {
  document.querySelector(".requiredImg").textContent = "";
};

btnSubmit.addEventListener("click", function (e) {
  input.forEach((element) => {
    if (element.value.length == 0) {
      element.previousElementSibling.children[1].textContent =
        "This field can't be empty";
      e.preventDefault();
    }
  });
  // console.log(typeof input2)
  if (input2.files.length == 0) {
    document.querySelector(".requiredImg").textContent =
      "This field can't be empty";
    e.preventDefault();
  }
  if (input3.files.length == 0) {
    document.querySelector(".requiredEmail").textContent =
      "This field can't be empty";
    e.preventDefault();
  }
  input1.forEach((element) => {
    if (element.value.length == 0) {
      element.style.border = "2px solid red ";
      e.preventDefault();
    }
  });
});
