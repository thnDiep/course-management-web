const icon = document.querySelectorAll(".Edit");
const editInfor = document.querySelector(".btnEdit");

const nameInput = document.querySelector(".inputName");
const emailInput = document.querySelector(".inputEmail");
const passInput = document.querySelector(".inputPass");
const newPassInput = document.querySelector(".inputNewPass");
const input = document.querySelectorAll(".input");

const pageEdit = document.querySelector("#edit");
const overlay1 = document.querySelector(".check");
const mailformat =
  /^[a-z][a-z0-9_\.]{5,32}@[a-z0-9]{2,}(\.[a-z0-9]{2,4}){1,2}$/;
const nameformat = /^[A-Za-z][A-Za-z0-9_]{7,29}$/;
const passformat = /^[A-Za-z]\w{5,14}$/;

// Xử lý nút nhấn icon để sửa
const edit = (input, e) => {
  input.removeAttribute("disabled");
  input.focus();
  input.classList.toggle("border1");
};
icon[0].addEventListener("click", function (e) {
  edit(nameInput, e);
});
icon[1].addEventListener("click", function (e) {
  edit(emailInput, e);
});
icon[2].addEventListener("click", function (e) {
  edit(passInput, e);
});
icon[3].addEventListener("click", function (e) {
  edit(newPassInput, e);
});

// Xử lý form được gửi hay không
editInfor.addEventListener("click", function (e) {
  if (input[2].value.length === 0) {
    edit(input[2], e);
    input[2].classList.toggle("border");
    e.preventDefault();
  }
});

// Xử lý khi đang nhập
input[0].oninput = () => {
  if (!input[0].value.match(nameformat)) {
    input[0].classList.add("border");
  } else {
    input[0].classList.remove("border");
  }
};
input[1].oninput = () => {
  if (!input[1].value.match(mailformat)) {
    input[1].classList.add("border");
  } else {
    input[1].classList.remove("border");
  }
};
input[2].oninput = () => {
  if (input[2].value.length !== 0) {
    input[2].classList.remove("border");
  }
};
input[3].oninput = () => {
  if (!input[3].value.match(passformat)) {
    input[3].classList.add("border");
  } else {
    input[3].classList.remove("border");
  }
};

// Khi hình ảnh thay đổi sẽ gửi ảnh về public theo method PUT
const profileImageForm = document.forms["profileImageForm"];
$("#file").change(function (e) {
  profileImageForm.action = "/student/profile/image/" + "?_method=PUT";
  profileImageForm.submit();
});

function update() {}
