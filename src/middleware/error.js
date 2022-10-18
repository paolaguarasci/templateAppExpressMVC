export function createErrorMiddleware(req, res, next) {
  next(createError(404));
}

export function errorToView(err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};
  res.status(err.status || 500);
  res.render("error");
}

function createError(status, message = "") {
  const error = new Error(message);
  error.status = status;

  return error;
}
