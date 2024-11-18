const { Router } = require("express");
const { checkUser } = require("../middleware/admin.middleware");
const {comment, getComment} = require("../controller/comment.controller");

const commentRouter = Router();

commentRouter.post("/add_comment",checkUser, comment)
commentRouter.get("/get_comment",checkUser, getComment)

module.exports = commentRouter;