const { Router } = require("express");
const { register, login, verify } = require("../controller/register.controller");
const { RegisterValidate } = require("../middleware/register.validate.middleware");

const registerRouter = Router();

registerRouter.post("/register", RegisterValidate, register);
registerRouter.post("/login", login);
registerRouter.post("/verify", verify);

module.exports = registerRouter;