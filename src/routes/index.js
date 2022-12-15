import searchRoute from "./search.route.js";
<<<<<<< Updated upstream
import adminRoute from "./admin.route.js";
=======
import coursesRoute from "./courses.route.js"
>>>>>>> Stashed changes

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

  app.get("/", (req, res) => {
    res.render("home", {
      check: true,
    });
  });

  app.get("/profile", (req, res) => {
    res.render("profile", {
      check: false,
    });
  });

  app.get("/teacherProfile", (req, res) => {
    res.render("teacherProfile", {
      check: false,
    });
  });
  app.get("/listAccount", (req, res) => {
    res.render("listAccount", {
      check: false,
    });
  });
  

  app.get("/createCourse", (req, res) => {
    res.render("createCourse", {
      check: false,
    });
  });

  app.use("/search", searchRoute);
  app.use("/courses", coursesRoute);

<<<<<<< Updated upstream
  app.get("/courses/courseDetail", (req, res) => {
    res.render("courseDetail");
  });

  app.use("/admin", adminRoute);
=======
>>>>>>> Stashed changes
}
