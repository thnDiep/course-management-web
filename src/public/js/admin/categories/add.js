function handleInvalid() {
  updateForms();
  forms.forEach(form => {
    const formGroup = form.querySelector(".addCatFormGroup")
    const formMsg = form.querySelector(".form-message");
    const nameInput = form.querySelector("input[name='name']");
    let nameValue;

    form.addEventListener("submit" , function (e) {
      e.preventDefault();
  
      nameValue = nameInput.value.trim();
      if (nameValue.length === 0) {
        formGroup.classList.add("invalid");
        formMsg.innerText = "Please fill category name";
      }
      else {
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
    })

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
  })
}

function updateForms(){
  forms = document.querySelectorAll(".addCatForm");
}

const formContainer = document.getElementById("addCatForms");
const template = document.getElementById("templateForm").innerHTML;
const inputNumber = document.getElementById("numberAddInput");
const addAllBtn = document.getElementById("addAllBtn");

let forms;
handleInvalid();

inputNumber.onchange = function (e) {
  updateForms();
  const number = e.target.value;

  if (number > forms.length) {
    const duration = number - forms.length;

    for (let i = 0; i < duration; i++) {
      formContainer.insertAdjacentHTML( 'beforeend', template );
    }
  }
  else {
    for (let i = forms.length - 1; i >= number ; i--) {
      formContainer.removeChild(forms[i])
    }
  }

  handleInvalid(); 
};

// addAllBtn.onclick = function (e) {
//   updateForms();
//   const nameInputs = [];
//   let isValid = true;
  
//   forms.forEach(form => {
//     const formGroup = form.querySelector(".addCatFormGroup")
//     const formMsg = form.querySelector(".form-message");
//     const nameInput = form.querySelector("input[name='name']");
//     let nameValue;

//     nameValue = nameInput.value.trim();
//     if (nameValue.length === 0) {
//       formGroup.classList.add("invalid");
//       formMsg.innerText = "Please fill category name";
//       isValid = false;
//       return;
//     }

//     $.getJSON(
//       `/admin/categories/add/is-available?name=${nameValue}`,
//       function (data) {
//         if (data === false) {
//           $("#failedAddModel").modal("show");
//           isValid = false;
//           return;
//         }
//       }
//     );
    
//     if(nameInputs.includes(nameValue)){
//       isValid = false;
//       return;
//     }

//     nameInputs.push(nameValue);
//   })

//   if(isValid){
//     forms.forEach(form => {
//       console.log(form)
//       form.submit()}
//       );
//   }
// }






