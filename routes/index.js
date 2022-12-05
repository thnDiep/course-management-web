import searchRoute from "./search.route.js";

export default function route(app) {
  // Routes

  app.get("/", (req, res) => {
    res.render("home");
  });

  app.use("/search", searchRoute);
}
