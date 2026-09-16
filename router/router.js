const express = require("express");
const fs = require("fs");
const path = require("path");

const router = express.Router();

// get all users or filtered
router.get("/users", (req, res) => {
  fs.readFile(pathToFile, "utf-8", (err, data) => {
    if (err) {
      return res.status(500).json({
        message: "Internal Server Error",
      });
    }
    // handles both /users and /users?minAge=20
    const users = JSON.parse(data);
    if (req.query.minAge) {
      const minAge = Number(req.query.minAge);
      const filteredUsers = users.filter((user) => user.age >= minAge);
      return res.status(200).json(filteredUsers);
    }
    res.status(200).json(users);
  });
});

// get 1 user
router.get("/users/:id", (req, res) => {
  fs.readFile(pathToFile, "utf-8", (err, data) => {
    if (err) {
      return res.status(500).json({
        message: "Internal Server Error",
      });
    }
    const users = JSON.parse(data);
    const id = Number(req.params.id);
    const user = users.find((user) => user.id === id);
    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }
    res.status(200).json(user);
  });
});

// add a user
router.post("/users", (req, res) => {
  fs.readFile(pathToFile, "utf-8", (err, data) => {
    if (err) {
      return res.status(500).json({
        message: "Internal Server Error",
      });
    }
    const users = JSON.parse(data);
    const newUser = {
      id: users.length + 1,
      name: req.body.name,
      email: req.body.email,
      age: req.body.age,
      city: req.body.city,
    };
    users.push(newUser);

    fs.writeFile(pathToFile, JSON.stringify(users, null, 2), (err) => {
      if (err) {
        return res.status(500).json({
          message: "Internal Server Error",
        });
      }

      res.status(201).json(newUser);
    });
  });
});

// update a user
router.patch("/users/:id", (req, res) => {
  fs.readFile(pathToFile, "utf-8", (err, data) => {
    if (err) {
      return res.status(500).json({
        message: "Internal Server Error",
      });
    }

    const users = JSON.parse(data);

    const id = Number(req.params.id);

    const index = users.findIndex((user) => user.id === id);

    if (index === -1) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    const updatedUser = {
      ...users[index],
      ...req.body,
    };

    users[index] = updatedUser;

    fs.writeFile(pathToFile, JSON.stringify(users, null, 2), (err) => {
      if (err) {
        return res.status(500).json({
          message: "Internal Server Error",
        });
      }

      res.status(200).json(updatedUser);
    });
  });
});

// delete a user
router.delete("/users/:id", (req, res) => {
  fs.readFile(pathToFile, "utf-8", (err, data) => {
    if (err) {
      return res.status(500).json({
        message: "Internal Server Error",
      });
    }

    const users = JSON.parse(data);
    const id = Number(req.params.id);
    const index = users.findIndex((user) => user.id === id);
    if (index === -1) {
      return res.status(404).json({
        message: "User not found",
      });
    }
    users.splice(index, 1);
    fs.writeFile(pathToFile, JSON.stringify(users, null, 2), (err) => {
      if (err) {
        return res.status(500).json({
          message: "Internal Server Error",
        });
      }
      res.status(204).send();
    });
  });
});

// get all books or filtered
router.get("/books", (req, res) => {
  fs.readFile(pathToFile2, "utf-8", (err, data) => {
    if (err) {
      return res.status(500).json({
        message: "Internal Server Error",
      });
    }

    const books = JSON.parse(data);

    // handles /books?minPrice=400
    if (req.query.minPrice) {
      const minPrice = Number(req.query.minPrice);

      const filteredBooks = books.filter((book) => book.price >= minPrice);

      return res.status(200).json(filteredBooks);
    }

    res.status(200).json(books);
  });
});

// GET one book
// GET /books/2

router.get("/books/:id", (req, res) => {
  fs.readFile(pathToFile2, "utf-8", (err, data) => {
    if (err) {
      return res.status(500).json({
        message: "Internal Server Error",
      });
    }

    const books = JSON.parse(data);

    const id = Number(req.params.id);

    const book = books.find((book) => book.id === id);

    if (!book) {
      return res.status(404).json({
        message: "Book not found",
      });
    }

    res.status(200).json(book);
  });
});

// PATCH - update a book
// PATCH /books/2

router.patch("/books/:id", (req, res) => {
  fs.readFile(pathToFile2, "utf-8", (err, data) => {
    if (err) {
      return res.status(500).json({
        message: "Internal Server Error",
      });
    }

    const books = JSON.parse(data);

    const id = Number(req.params.id);

    const index = books.findIndex((book) => book.id === id);

    if (index === -1) {
      return res.status(404).json({
        message: "Book not found",
      });
    }

    const updatedBook = {
      ...books[index],
      ...req.body,
    };

    books[index] = updatedBook;

    fs.writeFile(pathToFile2, JSON.stringify(books, null, 2), (err) => {
      if (err) {
        return res.status(500).json({
          message: "Internal Server Error",
        });
      }

      res.status(200).json(updatedBook);
    });
  });
});

// DELETE a book
// DELETE /books/2
router.delete("/books/:id", (req, res) => {
  fs.readFile(pathToFile2, "utf-8", (err, data) => {
    if (err) {
      return res.status(500).json({
        message: "Internal Server Error",
      });
    }

    const books = JSON.parse(data);

    const id = Number(req.params.id);

    const index = books.findIndex((book) => book.id === id);

    if (index === -1) {
      return res.status(404).json({
        message: "Book not found",
      });
    }

    books.splice(index, 1);

    fs.writeFile(pathToFile2, JSON.stringify(books, null, 2), (err) => {
      if (err) {
        return res.status(500).json({
          message: "Internal Server Error",
        });
      }

      res.status(204).send();
    });
  });
});

module.exports=router