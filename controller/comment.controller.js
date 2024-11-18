const BooksSchemas = require("../schemas/books.schema");
const CommentsSchemas = require("../schemas/comment.schema");

const comment = async (req, res, next) => {
  try {
    const { category, description, like, book_id } = req.body;
    const { token } = req.headers;
    const foundedBook  = await BooksSchemas.findById(book_id)
    if(token && foundedBook){
      await CommentsSchemas.create({
        category,
        description,
        like,
        book_id
      });
      res.json({
        message: "comment added"
      })
    }else{
      res.json({
        message: "invalid token or not founded book"
      })
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
}

module.exports = {
  comment, getComment
};
