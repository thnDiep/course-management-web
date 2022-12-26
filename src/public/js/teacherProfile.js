const input = document.querySelectorAll(".text-muted")
const submit = document.querySelector(".submit")
const nameformat = /^[a-zA-Z]{4,}(?: [a-zA-Z]+){0,2}$/;
const mailformat =
  /^[a-z][a-z0-9_\.]{5,32}@[a-z0-9]{2,}(\.[a-z0-9]{2,4}){1,2}$/;
submit.addEventListener("click",function(e){
  input.forEach(element => {
    if (element.value.length === 0) {
      element.style.border ='1px solid red'
      element.previousElementSibling.classList.remove("hidden")
      e.preventDefault();
  }
  });
  console.log(input[0].value)
  if (!input[0].value.match(nameformat)) {
    input[0].style.border ='1px solid red'
    input[0].previousElementSibling.classList.remove("hidden")
    e.preventDefault();
  }
  if (!input[1].value.match(mailformat)) {
    input[1].style.border ='1px solid red'
    input[1].previousElementSibling.classList.remove("hidden")
    e.preventDefault();
  }
  if(!input[4].value.match(input[3].value)) {
    input[4].style.border ='1px solid red'
    input[4].previousElementSibling.classList.remove("hidden")
    e.preventDefault();
  }
  
  
})
input.forEach(element => {
  element.oninput = (e)=>{
    element.style.border ='1px solid #000'
    element.previousElementSibling.classList.add("hidden")

  }
  element.onblur = (e)=>{
    if (element.value.length === 0) {
      element.style.border ='1px solid red'
      element.previousElementSibling.classList.remove("hidden")
    }
  }
})