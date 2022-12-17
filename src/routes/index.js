import searchRoute from "./search.route.js";
import adminRoute from "./admin.route.js";
import coursesRoute from "./courses.route.js";
import userRoute from "./user.route.js";

export default function route(app) {
  // Routes
  app.get("/login", (req, res) => {
    res.render("login", {
      check: false,
    });
  });

  app.get("/signup", (req, res) => {
    res.render("signUp", {
      check: false,
    });
  });

  app.use("/search", searchRoute);
  app.use("/courses", coursesRoute);

  // admin
  app.use("/admin", adminRoute);
  //user
  app.use("/", userRoute);
}
