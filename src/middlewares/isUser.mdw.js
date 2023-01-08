export default function (req, res, next) {
  if (!req.session.isStudent) {
    return res.redirect("back");
  }
  next();
}
