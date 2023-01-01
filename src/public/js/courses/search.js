// import courseModel from "../../../models/courseModel";

const searchForm = document.getElementById("searchForm");
const coursesElement = document.querySelector(".courses__body");
console.log(coursesElement);
window.onscroll = async function (e) {
  if (this.innerHeight + this.pageYOffset >= document.body.scrollHeight) {
    // const courses = await courseModel.getPageByCategoryId(1, limit, offset); // Function tìm kiếm
    // searchForm.action = '/courses/search?'
    // console.log(searchForm.action);
    // searchForm.submit();
  }
};
