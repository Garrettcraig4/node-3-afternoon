module.exports = function(req, res, next) {
  const { session } = req;
  if (!session.session) {
    session.user = { username: "", cart: [], total: 0 };
    next();
  }
};
