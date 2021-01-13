const express = require("express");
const router = express.Router();

const Book = require("../models/Book");
const User = require("../models/User");

router.get("/", (req, res) => {
  Book.find()
    .then(books => res.json(books))
    .catch(() => res.status(400).json("Couldn't fetch books from database."));
});

router.post("/add-book", (req, res) => {
  Book.findOne({ apiID: req.body.apiID })
    .then(book => {
      if (book) {
        return res.status(409).json("Book already exists in database.");
      } else {
        const newBook = new Book(Object.assign({}, req.body));
        newBook
          .save()
          .then(() => res.json("Book successfully added to database!"))
          .catch(() => res.json("Couldn't add book to database."));
      }
    }
  );
});

router.delete("/delete-book", (req, res) => {
  Book.deleteMany(
    { "apiID": req.body.apiID },
    function(err) {
      if (err) {
        return res.status(400).json("Couldn't remove book from \"books\" collection.");
      } else {
        User.updateMany(
          { },
          { $pull: { books: req.body.apiID }},
          function(err) {
            if (err) {
              return res.status(400).json("Couldn't remove book from users' collections.");
            } else {
              return res.json("Book successfully removed from database!");
            }
          }
        );
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
        return res.status(400).json("Couldn't add book to your collection.");
      } else {
        if (user.books.includes(req.body.apiID)) {
          return res.status(409).json("Book already exists in your collection.");
        } else {
          return res.json("Book successfully added to your collection!");
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
        return res.status(400).json("Couldn't find user.");
      } else {
        Book.find(
          { 'apiID': { $in: user.books } },
          function(err, books) {
            if (err) {
              return res.status(400).json("Couldn't fetch user's books.");
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
    function(err) {
      if (err) {
        return res.status(404).json("Couldn't remove book from your collection.");
      } else {
        return res.json("Book successfully removed from your collection!");
      }
    }
  );
});

module.exports = router;
