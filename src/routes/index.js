import adminRoute from "./admin.route.js";
import studentRoute from "./home.route.js";
import coursesRoute from "./courses.route.js";
import teacherRoute from "./teacher.route.js";
export default function route(app) {
  app.use("/courses", coursesRoute);
  app.use("/admin", adminRoute);
  //teacher chỉnh sau
  app.use("/teacher", teacherRoute);
  // student
  app.use("/", studentRoute);
  //
}
