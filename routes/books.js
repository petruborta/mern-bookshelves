const express = require("express");
const router = express.Router();

const Book = require("../models/Book");
const User = require("../models/User");

router.get("/", (req, res) => {
  Book.find()
    .sort({ date: -1 })
    .then(books => res.json(books))
    .catch(() => res.status(400).json("Couldn't fetch books from database."));
});

router.post("/add-book", (req, res) => {
  Book.findOne({ apiID: req.body.apiID })
    .then(book => {
      if (book) {
        return res.status(409).json("Book already exists in database.");
      }

      const newBook = new Book(Object.assign({}, req.body));
      newBook
        .save()
        .then(() => res.json("Book successfully added to database!"))
        .catch(() => res.json("Couldn't add book to database."));
    }
  );
});

router.delete("/delete-book", (req, res) => {
  Book.deleteMany(
    { apiID: req.body.apiID },
    function(err) {
      if (err) {
        return res.status(400).json("Couldn't remove book from \"books\" collection.");
      }

      User.updateMany(
        { },
        { $pull: { books: { apiID: req.body.apiID }}},
        function(err) {
          if (err) {
            return res.status(400).json("Couldn't remove book from users' collections.");
          }
          
          return res.json("Book successfully removed from database!");
        }
      );
    }
  );
});

router.post("/add-favorite-book", (req, res) => {
  User.findOneAndUpdate({
      _id: req.body.userID,
      books: { $not: { $elemMatch: { apiID: req.body.apiID }}}
    }, {
      $addToSet: { 
        books: { 
          apiID: req.body.apiID,
          date: new Date().toLocaleString()
        }
      }
    },
    function(err, user) {
      if (err) {
        return res.status(400).json("Couldn't add book to your collection.");
      }
      if (user === null) {
        return res.status(409).json("Book already exists in your collection.");
      }

      return res.json("Book successfully added to your collection!");
    }
  );
});

router.get("/fetch-favorite-books", (req, res) => {
  User.findById(
    req.query.userID,
    function(err, user) {
      if (err) {
        return res.status(404).json("User not found.");
      }

      const apiIDsOfBooks = getApiIDsOfBooks(user);

      Book.find(
        { apiID: { $in: apiIDsOfBooks }},
        function(err, books) {
          if (err) {
            return res.status(400).json("Couldn't fetch user's books.");
          }

          const favoriteBooks = replaceDatesOfAtlasBooksWithDatesFromUserBooks(books, user.books);
          const sortedFavoriteBooks = favoriteBooks.sort(descending);

          return res.json(sortedFavoriteBooks);
        }
      );
    });
});

router.delete("/delete-favorite-book", (req, res) => {
  User.findByIdAndUpdate(
    req.body.userID, 
    { $pull: { books: { apiID: req.body.apiID }}},
    function(err) {
      if (err) {
        return res.status(404).json("Couldn't remove book from your collection.");
      }
        
      return res.json("Book successfully removed from your collection!");
    }
  );
});

const getApiIDsOfBooks = (user) => {
  return user.books.map(book => book.apiID);
}

const replaceDatesOfAtlasBooksWithDatesFromUserBooks = (atlasBooks, userBooks) => {
  let updatedBooks = atlasBooks.map(atlasBook => {
    let userBook = userBooks.filter(userBook => userBook.apiID === atlasBook.apiID);

    atlasBook._doc.date = userBook[0].date;
    return atlasBook;
  });
  
  return updatedBooks;
}

const descending = (a, b) => {
  if (a.date < b.date){
    return 1;
  }
  if (a.date > b.date){
    return -1;
  }
  
  return 0;
}

module.exports = router;
