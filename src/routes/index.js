import searchRoute from "./search.route.js";

export default function route(app) {
  // Routes
  app.get("/login", (req, res) => {
    res.render("login");
  });

  app.get("/signup", (req, res) => {
    res.render("signUp");
  });

  app.get("/", (req, res) => {
    res.render("home");
  });

  app.get("/profile", (req, res) => {
    res.render("profile");
  });

  app.get("/courses", (req, res) => {
    res.render("courses");
  });

  app.use("/search", searchRoute);

  app.get("/courseDetail", (req, res) => {
    res.render("courseDetail");
  });
}
