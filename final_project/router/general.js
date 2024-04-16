const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();


public_users.post("/register", (req,res) => {
  //Write your code here
  if(!req.body.username) {
    return res.status(400).json({message: "Username is required in HTML body"});
  }
  
  if (!req.body.password) {
    return res.status(400).json({message: "Password is required in HTML body"});
  }
  if (  !isValid(req.body.username)) {
    return res.status(400).json({message: "Username is invalid"});
  }

    
  users.push(
    {
        username: req.body.username,
        password: req.body.password
    }
);

  return res.status(200).json({message: "Customer successfully registered. Now you can login."});
});

// Get the book list available in the shop
public_users.get('/',function (req, res) {
  //Write your code here
  return res.status(200).send(JSON.stringify(books, null, " "));
});

// Get book details based on ISBN
public_users.get('/isbn/:isbn',function (req, res) {
  //Write your code here
  return res.status(200).send(JSON.stringify(books[req.params.isbn], null, " "));
 });
  
// Get book details based on author
public_users.get('/author/:author',function (req, res) {
  //Write your code here
  let matchingBooks = [];
  Object.keys(books).forEach(key => {
    if (books[key].author == req.params.author) {
        matchingBooks.push(books[key]);
    }
  });
  return res.status(200).send(JSON.stringify(matchingBooks, null, " "));
});

// Get all books based on title
public_users.get('/title/:title',function (req, res) {
  //Write your code here
  let matchingBooks = [];
  Object.keys(books).forEach(key => {
    if (books[key].title == req.params.title) {
        matchingBooks.push(books[key]);
    }
  });
  return res.status(200).send(JSON.stringify(matchingBooks, null, " "));
});

//  Get book review
public_users.get('/review/:isbn',function (req, res) {
  //Write your code here
  return res.status(200).send(JSON.stringify(books[req.params.isbn].reviews, null, " "));
});

module.exports.general = public_users;
