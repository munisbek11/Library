const { Schema, model } = require("mongoose");

const commentSchemas = new Schema(
  {
    category: {
      type: String,
      required: true,
      enum: {
        values: ["Muallif haqida", "Kitobdan iqtiboslar", "Kitobxonlar taqrizi"],
        message: "{VALUE} bunday kategoriya mavjud emas!" // To'g'ri xato: `{VALUE}` bo'lishi kerak
      }
    },
    description: {
      type: String,
      required: true,
      set: (value) => value.trim(),
    },
    like: {
      type: Boolean,
      default: false, 
    },
    book_id: {
      type: Schema.Types.ObjectId,
      ref: "Books", 
      required: true, 
    }
  },
  {
    versionKey: false, 
    timestamps: true,
  }
);

const CommentsSchemas = model("comment", commentSchemas);

module.exports = CommentsSchemas;
