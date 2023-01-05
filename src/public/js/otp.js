const input = document.querySelectorAll(".form-control")
const submit = document.getElementById("form-submit")
if (input[0].value.length === 0) {
    input[0].focus();
}
let i = 0;
input.forEach(element => {
    element.oninput = (e) => {
        console.log(element);
        if (element.value >= 0 && element.value <= 9) {
            i = i + 1;
            if (i < 4)
                input[i].focus()
            else {
                submit.submit()
            }
        }

    }
    element.onblur = (e) => {
        if (element.value.length === 0) {
            element.focus();
        }
    }
})