const { Router } = require("express");
const { register, login, verify, logout } = require("../controller/register.controller");
const { RegisterValidate } = require("../middleware/register.validate.middleware");
const verifyRefreshToken = require("../middleware/refreshToken.middleware");

const registerRouter = Router();

registerRouter.post("/register", RegisterValidate, register);
registerRouter.post("/login", login);
registerRouter.post("/verify", verify);
registerRouter.post("/refresh", verifyRefreshToken);
registerRouter.post("/logout", logout);

module.exports = registerRouter;