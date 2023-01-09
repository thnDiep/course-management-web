import adminRoute from "./admin.route.js";
import studentRoute from "./home.route.js";
import coursesRoute from "./courses.route.js";
import accountRoute from "./account.route.js";
import teacherRoute from "./teacher.route.js";
export default function route(app) {
  app.use("/account", accountRoute);
  app.use("/courses", coursesRoute);
  app.use("/admin", adminRoute);
  app.use("/teacher", teacherRoute);
  app.use("/", studentRoute);
}
