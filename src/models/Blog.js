import mongoose from "mongoose";

const BlogSchema = new mongoose.Schema({
  title: String,
  content: String,
});

export default mongoose.models.Blog || mongoose.model("Blog", BlogSchema);

[
  {
    "_id": "665e1b...",
    "title": "Başlık",
    "content": "İçerik"
  }
]