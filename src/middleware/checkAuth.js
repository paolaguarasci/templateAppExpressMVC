export default function checkAuth(req, res, next) {
  if (!req.isAuthenticated || !req.isAuthenticated()) {
    res.locals.logged = false;
    return res.redirect(403, '/auth/login');
  }
  res.locals.logged = true;
  next();
}
