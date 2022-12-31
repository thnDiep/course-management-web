export default function (req, res, next) {
    if(!req.session.isTeacher){
      return res.redirect("back");
    }
    next();
  }
  