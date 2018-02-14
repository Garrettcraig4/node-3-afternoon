require("dotenv").config();
const express = require("express");
const session = require("express-session");
const bodyparser = require("body-parser");
const port = 3000;
const checkForSession = require("./middlewares/checkForSession.js");
const swag = require("../server/controllers/swag_controller");
const auth = require("../server/controllers/auth_controller");
const cart = require("../server/controllers/cart_controller");
const search = require("../server/controllers/search_controller");
const app = express();
app.use(bodyparser.json());
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    saveUninitialized: false,
    resave: false,
    cookie: { maxAge: 10000 }
  })
);
app.use((req, res, next) => checkForSession(req, res, next));
app.use(express.static(`${__dirname}/build`));
app.get("/api/swag", swag.read);
app.post("/api/login", auth.login);
app.post("/api/register", auth.register);
app.post("/api/signout", auth.signout);
app.get("/api/user", auth.getUser);
app.post("/api/cart", cart.add);
app.post("/api/cart/checkout", cart.checkout);
app.delete("/api/cart", cart.remove);
app.get("/api/search", search.search);
app.listen(port, () => {
  console.log(`i can hear on ${port}`);
});
