const users = require("../models/users");
let id = 1;

module.exports = {
  login: function(req, res, next) {
    const { session } = req;
    const { username, password } = req.body;

    const user = users.find(
      user => user.username === username && user.password === password
    );
    if (user) {
      session.user.username = user.username;
      res.status(200).send(session.user);
    } else {
      res.status(500).send("not authorised");
    }
  },
  register: function(req, res, next) {
    const { session } = req;
    const { username, password } = req.body;

    users.push({ id, username, password });
    id += 1;
    res.status(200).send(session.user);
  },
  signout: function(req, res, next) {
    const { session } = req;
    req.session.destroy();
    return req.session;
  },
  getUser: function(req, res, next) {
    res.status(200).send(session.user);
  }
};
