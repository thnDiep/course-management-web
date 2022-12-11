import searchRoute from "./search.route.js";

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

  app.get("/courses", (req, res) => {
    res.render("courses", {
      check: false,
    });
  });

  app.use("/search", searchRoute);

  app.get("/courses/courseDetail", (req, res) => {
    res.render("courseDetail");
  });
}
