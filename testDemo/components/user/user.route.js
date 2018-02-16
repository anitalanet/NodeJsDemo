var route = require("express").Router();
var user = require("./user.userController");

route.post('/create/user', user.createUser);
module.exports = route;