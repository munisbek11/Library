const { Router } = require("express");
const {
  getAuthors,
  addAuthor,
  updateAuthor,
  deleteAuthor,
  getOneAuthors,
} = require("../controller/authors.controller");
const checkAdmin = require("../middleware/admin.middleware");
const uploadImage = require("../middleware/uploadImage")
const { authorValidate } = require("../middleware/author.validate.miidleware");
const authorRouter = Router();

authorRouter.get("/get_authors", getAuthors);
authorRouter.get("/get_one_author/:id",  getOneAuthors);
authorRouter.post("/add_author", authorValidate, checkAdmin, addAuthor);
authorRouter.post("/upload", uploadImage.single("image"), (req, res) => {
  if (req.file) {
    res.json({ message: "Rasm muvaffaqiyatli yuklandi!", file: req.file });
  } else {
    res.status(400).json({ message: "Fayl yuklanmadi." });
  }
});
authorRouter.put("/update_author/:id", authorValidate, checkAdmin, updateAuthor);
authorRouter.delete("/delete_author/:id",authorValidate, checkAdmin, deleteAuthor);

module.exports = authorRouter;
