export default function (req, res, next) {
    if(!req.session.isAdmin){
      return res.redirect("back");
    }
    next();
  }
  