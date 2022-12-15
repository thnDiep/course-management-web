$(document).ready(function() {
    $('.btnNext').click(function() {
      $('.nav-tabs .active').parent().next('li').find('a').trigger('click');
    });
  
    $('.btnPrevious').click(function() {
      $('.nav-tabs .active').parent().prev('li').find('a').trigger('click');
    });
  });
  