
export default function (app) 
{
  app.use(async function (req, res, next) {
    if (typeof req.session.isAuthenticated === 'undefined') {
      req.session.isAuthenticated = false;
    }

    res.locals.lcIsAuthenticated = req.session.isAuthenticated;
    res.locals.lcAuthUser = req.session.authUser;
    console.log(res.locals.lcAuthUser)

    next();
  })

  // app.use(async function (req, res, next) {
  //   res.locals.lcCategories = await categoryService.findAllWithDetails();
  //   next();
  // });
}