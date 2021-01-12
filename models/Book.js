const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const BookSchema = new Schema({
  apiID: String,
  selfLink: String,
  volumeInfo: {
    title: String,
    subtitle: String,
    authors: String,
    publisher: String,
    publishedDate: String,
    description: String,
    industryIdentifiers: {
      ISBN_13: String,
      ISBN_10: String
    },
    pageCount: Number,
    categories: String,
    imageLinks: {
      smallThumbnail: String,
      thumbnail: String
    },
    language: String,
    infoLink: String
  }
});

module.exports = Book = mongoose.model("books", BookSchema);
