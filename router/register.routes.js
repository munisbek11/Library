const { Router } = require("express");
const { register, login, verify } = require("../controller/register.controller");

const registerRouter = Router();

registerRouter.post("/register", register);
registerRouter.post("/login", login);
registerRouter.post("/verify", verify);

module.exports = registerRouter;