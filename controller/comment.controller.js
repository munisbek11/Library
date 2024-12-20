const BooksSchemas = require("../schemas/books.schema");
const CommentsSchemas = require("../schemas/comment.schema");
const BaseError = require("../utils/BeseError");

const comment = async (req, res, next) => {
  try {
    const { category, description, like, book_id } = req.body;
    const { AccessToken } = req.cookies;
    const foundedBook = await BooksSchemas.findById(book_id);
    if (AccessToken && foundedBook) {
      await CommentsSchemas.create({
        category,
        description,
        like,
        book_id,
      });
      res.json({
        message: "comment added",
      });
    } else {
      throw BaseError.BadRequest("invalid token or not founded book");
    }
  } catch (error) {
    next(error);
  }
};

const getComment = async (req, res, next) => {
  try {
    const comments = await CommentsSchemas.find();
    res.json(comments);
  } catch (err) {
    next(err);
  }
};

module.exports = {
  comment,
  getComment,
};
