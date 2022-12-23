const submit = document.querySelector(".btn-success")
const formInput = document.querySelectorAll(".form-control")
const required = document.querySelectorAll(".required")
const nameformat = /^[A-Za-z][A-Za-z0-9_]{7,29}$/;
const mailformat =
  /^[a-z][a-z0-9_\.]{5,32}@[a-z0-9]{2,}(\.[a-z0-9]{2,4}){1,2}$/;
submit.addEventListener("click",function(e){
    if (formInput[0].value.length === 0) {
        required[0].innerHTML = "Please fill name";
        formInput[0].focus();
        e.preventDefault();
    }
    if (formInput[1].value.length === 0) {
        required[1].innerHTML = "Please fill email";
        formInput[1].focus();
        e.preventDefault();
    }
    if (!formInput[1].value.match(mailformat)) {
        required[1].innerHTML = "Please match the requested format.";
        formInput[1].focus();
        e.preventDefault();
    }

})
formInput[0].oninput = (e) => {
    required[0].innerHTML=""
    
}
formInput[0].onblur = (e) => {
    console.log(formInput[0].value.length)
    if (formInput[0].value.length === 0 ) {
        required[0].innerHTML = "Please fill name";
        formInput[0].focus();
    }
}
formInput[1].oninput = (e) => {
    required[1].innerHTML=""
}
formInput[1].onblur = (e) => {
    console.log(formInput[1].value.length)
    if (formInput[1].value.length === 0) {
    required[1].innerHTML = "Please fill email";
    formInput[1].focus();
    }
}
