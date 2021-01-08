const express = require("express");
const router = express.Router();

const Book = require("../models/Book");
const User = require("../models/User");

router.get("/", (req, res) => {
  Book.find()
    .then(books => res.json(books))
    .catch(err => res.status(400).json({ message: err }));
});

router.post("/add-book", (req, res) => {
  Book.findOne({ apiID: req.body.apiID })
    .then(book => {
      if (book) {
        return res.status(400).json({ message: "Book already exists in database" });
      } else {
        const newBook = new Book(Object.assign({}, req.body));
        newBook
          .save()
          .then(() => res.json({ message: "Book successfully added to database" }))
          .catch(err => console.log(err));
      }
    }
  );
});

router.delete("/delete-book", (req, res) => {
  Book.deleteMany(
    { "apiID": req.body.apiID },
    function(err, book) {
      if (err) {
        return res.status(400).json({ message: err });
      } else {
        User.updateMany(
          { },
          { $pull: { books: req.body.apiID }},
          function(err, user) {
            if (err) {
              return res.status(400).json({ message: err });
            }
          }
        );

        return res.json({ message: "Book successfully removed from database" });
      }
    }
  );
});

router.post("/add-favorite-book", (req, res) => {
  User.findByIdAndUpdate(
    req.body.userID, 
    { $addToSet: { books: req.body.apiID } },
    function(err, user) {
      if (err) {
        return res.status(400).json({ message: "Couldn't add book to your collection" });
      } else {
        if (user.books.includes(req.body.apiID)) {
          return res.json({ message: "Book already exists in your collection" });
        } else {
          return res.json({ message: "Book successfully added to your collection" });
        }
      }
    }
  );
});

router.get("/fetch-favorite-books", (req, res) => {
  User.findById(
    req.query.userID,
    function(err, user) {
      if (err) {
        return res.status(400).json({ message: "Couldn't find user" });
      } else {
        Book.find(
          { 'apiID': { $in: user.books } },
          function(err, books) {
            if (err) {
              return res.status(400).json({ message: "Couldn't fetch user's books" });
            } else {
              return res.json(books);
            }
          }
        );
      }
    });
});

router.delete("/delete-favorite-book", (req, res) => {
  User.findByIdAndUpdate(
    req.body.userID, 
    { $pullAll: { books: [ req.body.apiID ] } },
    { new: true },
    function(err, user) {
      if (err) {
        return res.status(400).json({ message: "Book does not exist in your collection" });
      } else {
        return res.json({
          books: user.books,
          message: "Book successfully removed from your collection"
        });
      }
    }
  );
});

module.exports = router;