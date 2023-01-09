export default function (app) {
  app.use(function (req, res, next) {
    res.render("404", { layout: false });
  });
}
