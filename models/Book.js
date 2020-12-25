const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const BookSchema = new Schema({
  apiID: String,
  selfLink: String,
  volumeInfo: {
    title: String,
    subtitle: String,
    authors: Array,
    publisher: String,
    publishedDate: Date,
    description: String,
    industryIdentifiers: {
      ISBN_13: String,
      ISBN_10: String
    },
    pageCount: Number,
    categories: Array,
    imageLinks: {
      smallThumbnail: String,
      thumbnail: String
    },
    language: String,
    infoLink: String
  }
});

module.exports = Book = mongoose.model("books", BookSchema);