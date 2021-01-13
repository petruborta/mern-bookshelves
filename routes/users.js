const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../config/keys");
const ObjectID = require("mongoose").Types.ObjectId;

const rootAdminID = require("../config/keys").rootAdminID;

const validateRegisterInput = require("../validation/register");
const validateLoginInput = require("../validation/login");

const User = require("../models/User");

router.post("/register", (req, res) => {
  const { errors, isValid } = validateRegisterInput(req.body);

  if (!isValid) {
    return res.status(400).json(errors);
  }
  
  User.findOne({ email: req.body.email }).then(user => {
    if (user) {
      return res.status(409).json({ email: "Email already exists" });
    } else {
      const newUser = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        isAdmin: false,
        books: [],
        bookCategories: []
      });

      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) throw err;
          newUser.password = hash;
          newUser
            .save()
            .then(user => res.json(user))
            .catch(err => console.log(err));
        });
      });
    }
  });
});

router.post("/login", (req, res) => {
  const { errors, isValid } = validateLoginInput(req.body);
  
  if (!isValid) {
    return res.status(400).json(errors);
  }
  
  const email = req.body.email;
  const password = req.body.password;

  User.findOne({ email }).then(user => {
    if (!user) {
      return res.status(404).json({ emailnotfound: "Email not found" });
    }

    bcrypt.compare(password, user.password).then(isMatch => {
      if (isMatch) {
        const payload = {
          id: user.id,
          name: user.name,
          books: [],
          booksAtlas: [],
          bookCategories: [],
          isAdmin: user.isAdmin
        };

        if (user.isAdmin ) {
          payload.usersAtlas = {
            regularUsers: [],
            adminUsers: []
          };
        }

        jwt.sign(
          payload,
          keys.secretOrKey,
          {
            expiresIn: 31556926
          },
          (err, token) => {
            res.json({
              success: true,
              token: "Bearer " + token
            });
          }
        );
      } else {
        return res
          .status(400)
          .json({ passwordincorrect: "Password incorrect" });
      }
    });
  });
});

router.get("/regular", (req, res) => {
  User.find({ isAdmin: { $eq: false } })
    .then(users => res.json(users.map(user => {
      return {
        id: user.id,
        email: user.email,
        name: user.name
      };
    })))
    .catch(err => res.status(400).json(err));
});

router.get("/admin", (req, res) => {
  User.find({ 
      _id: { $nin: [
        new ObjectID(req.query.exceptedID),
        new ObjectID(rootAdminID)
      ]},
      isAdmin: { $eq: true }
    })
    .then(admins => res.json(admins.map(admin => {
      return {
        id: admin.id,
        email: admin.email,
        name: admin.name
      };
    })))
    .catch(err => res.status(400).json(err));
});

router.post("/make-admin", (req, res) => {
  User.findByIdAndUpdate(
    req.body.userID,
    { $set: { isAdmin: true } },
    function(err) {
      if (err) {
        return res.status(400).json("Couldn't promote regular user to admin.");
      } else {
        return res.json("Regular user successfully promoted to admin!");
      }
    }
  );
});

router.post("/remove-admin", (req, res) => {
  User.findByIdAndUpdate(
    req.body.userID,
    { $set: { isAdmin: false } },
    function(err) {
      if (err) {
        return res.status(400).json("Couldn't demote admin to regular user.");
      } else {
        return res.json("Admin successfully demoted to regular user!");
      }
    }
  );
});

module.exports = router;
