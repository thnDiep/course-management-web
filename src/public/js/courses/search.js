$(".dropdown.courses__sort--mobile").on("hide.bs.dropdown", function () {
  $(".btn").html(
    `<h3 class="courses__sort__label">Sort by</h3>
    <i class="fa fa-angle-down" aria-hidden="true"></i>`
  );
  console.log("hide");
});

$(".dropdown.courses__sort--mobile").on("show.bs.dropdown", function () {
  $(".btn").html(
    `<h3 class="courses__sort__label">Sort by</h3>
    <i class="fa fa-angle-up" aria-hidden="true"></i>`
  );
  console.log("show");
});
