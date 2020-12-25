const express = require("express");
const router = express.Router();

const Book = require("../models/Book");

router.post("/add-book", (req, res) => {
  Book.findOne({apiID: req.body.apiID}).then(book => {
    if (book) {
      return res.status(400).json({ book: "Book already exists" });
    } else {
      const newBook = new Book(Object.assign({}, req.body));
      newBook
        .save()
        .then(() => res.json({ book: "Book added successfully" }))
        .catch(err => console.log(err));
    }
  });
});

module.exports = router;