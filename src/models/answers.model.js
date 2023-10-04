const mongoose = require("mongoose");
const { Schema } = mongoose;

const answersSchema = new Schema(
  {
    body: {
      type: String,
      required: true,
    },
    post_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Post",
      required: true,
    },
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Answers = mongoose.model("Answers", answersSchema);
module.exports = Answers;
