function handleInvalid() {
  updateForms();
  forms.forEach((form) => {
    const formGroup = form.querySelector(".addCatFormGroup");
    const formMsg = form.querySelector(".form-message");
    const nameInput = form.querySelector("input[name='name']");
    let nameValue;

    form.addEventListener("submit", function (e) {
      e.preventDefault();

      nameValue = nameInput.value.trim();
      if (nameValue.length === 0) {
        formGroup.classList.add("invalid");
        formMsg.innerText = "Please fill category name";
      } else {
        $.getJSON(
          `/admin/categories/add/is-available?name=${nameValue}`,
          function (data) {
            if (data === false) {
              $("#failedAddModel").modal("show");
            } else {
              form.removeEventListener("submit", null);
              form.submit();
            }
          }
        );
      }
    });

    nameInput.oninput = function (e) {
      formGroup.classList.remove("invalid");
      formMsg.innerHTML = "";
    };

    nameInput.onblur = function (e) {
      nameValue = nameInput.value.trim();
      if (nameValue.length === 0) {
        formGroup.classList.add("invalid");
        formMsg.innerText = "Please fill category name";
      }
    };
  });
}

function updateForms() {
  forms = document.querySelectorAll(".addCatForm");
}

function updateNumberForms(number) {
  if (number > forms.length) {
    const duration = number - forms.length;

    for (let i = 0; i < duration; i++) {
      formContainer.insertAdjacentHTML("beforeend", template);
    }
  } else {
    for (let i = forms.length - 1; i >= number; i--) {
      formContainer.removeChild(forms[i]);
    }
  }
}

const formContainer = document.getElementById("addCatForms");
const template = document.getElementById("templateForm").innerHTML;
const inputNumber = document.getElementById("numberAddInput");
const addAllBtn = document.getElementById("addAllBtn");

let forms;
handleInvalid();
updateNumberForms(inputNumber.value);

inputNumber.onchange = function (e) {
  updateForms();
  updateNumberForms(e.target.value);
  handleInvalid();
};

addAllBtn.onclick = async function (e) {
  updateForms();
  const submitCategories = [];
  let isValid = true;

  for (const form of forms) {
    const formGroup = form.querySelector(".addCatFormGroup");
    const formMsg = form.querySelector(".form-message");
    const nameInput = form.querySelector("input[name='name']");
    const parentInput = form.querySelector("select[name='parentID']");
    const imageInput = form.querySelector("input[name='image']");
    let nameValue;

    nameValue = nameInput.value.trim();
    if (nameValue.length === 0) {
      formGroup.classList.add("invalid");
      formMsg.innerText = "Please fill category name";
      isValid = false;
      return;
    }

    submitCategories.forEach((submitCategory) => {
      if (submitCategory.name === nameInput.value) {
        isValid = false;
        formGroup.classList.add("invalid");
        formMsg.innerText = "The category name is exist";
        return;
      }
    });

    await $.getJSON(
      `/admin/categories/add/is-available?name=${nameValue}`,
      function (data) {
        if (data === false) {
          isValid = false;
          formGroup.classList.add("invalid");
          formMsg.innerText = "The category name is exist";
          // $("#failedAddModel").modal("show");
          return;
        }
      }
    );

    submitCategories.push({
      name: nameInput.value,
      parentID: parseInt(parentInput.value),
      image: imageInput.value,
    });
    console.log(imageInput.value);
  }

  if (isValid) {
    const addAllForm = document.getElementById("addAllForm");

    for (const submitCategory of submitCategories) {
      addAllForm.insertAdjacentHTML(
        "beforeend",
        `<input type='hidden' name='name[]' value="${submitCategory.name}"></input>`
      );
      addAllForm.insertAdjacentHTML(
        "beforeend",
        `<input type='hidden' name='parentID[]' value="${submitCategory.parentID}"></input>`
      );
      addAllForm.insertAdjacentHTML(
        "beforeend",
        `<input type='file' name='image' value="${submitCategory.image}" style="display:none" multiple></input>`
      );
    }

    addAllForm.submit();
  }
};
