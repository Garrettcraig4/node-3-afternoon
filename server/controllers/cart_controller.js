const { swag } = require("../models/swag");

module.exports = {
  add: function(req, res, next) {
    let { cart } = req.session.user;
    const { id } = req.query;

    const index = cart.findIndex(swag => swag.id == id);

    if (index === -1) {
      const slectSwag = swag.find(swag => swag.id == id);
      cart.push(slectSwag);
      req.session.user.total += slectSwag.price;
    }
    res.status(200).send(req.session.user);
  },

  remove: function(req, res, next) {
    const { id } = req.query;
    const { cart } = req.session.user;

    const selectSwag = swag.find(swag => swag.id == id);

    if (selectSwag) {
      const i = cart.findIndex(swag => swag.id == id);
      cart.splice(i, 1);
      req.session.user.total -= selectSwag.price;
    }
  },
  checkout: (req, res, next) => {
    const { user } = req.session;
    user.cart = [];
    user.total = 0;

    res.status(200).send(req.session.user);
  }
};
