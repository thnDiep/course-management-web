
const formSubmit = document.getElementById("myFeedbackForm");
const btnSubmit = document.getElementById("btnSubmit");
const a = document.getElementById("submitLink");

btnSubmit.addEventListener("click", function (e) {
  e.preventDefault();
  var fb = document.getElementById("feedback");
  // console.log(fb);
  if ($("#feedback").val() != "") {
    var mess = $("#feedback").val();
    // alert(mess);/
  }
  var number = $('input[name=feedback]:checked', '#myFeedbackForm' ).val();
  // alert(number);
  const data = btnSubmit.dataset;

  a.href = `/courses/feedback?idCourse=${data.course}&mess=${mess}&number=${number}`;
  // btnSubmit.removeEventListener("click", null);
  // console.log(btnSubmit)
  a.click();
  // formSubmit.submit();
})

// document.querySelector('#btnSumit').addEventListener('click', handleSumit);


// $('#myFeedbackForm input').on('change', function() {
//   var number = $('input[name=feedback]:checked', '#myFeedbackForm' ).val();
//   alert(number);
// });