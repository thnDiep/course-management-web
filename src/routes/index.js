import searchRoute from "./search.route.js";
import adminRoute from "./admin.route.js";
import studentRoute from "./home.route.js";
import coursesRoute from "./courses.route.js";

export default function route(app) {
  app.use("/search", searchRoute);
  app.use("/courses", coursesRoute);
  //admin
  app.use("/admin", adminRoute);

  //teacher chỉnh sau
  app.get("/teacherProfile", (req, res) => {
    res.render("teacherProfile");
  });
  // student
  app.use("/", studentRoute);
  //
}
