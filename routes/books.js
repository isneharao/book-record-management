const express = require("express");
const { books } = require("../data/books.json");
const { users } = require("../data/users.json");

const router = express.Router();

/**
 * Route: /books
 * Method: GET
 * Description: Get all the books
 * Access: Public
 * Parmanters: none
 */
router.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    data: books,
  });
});

/**
 * Route: /books/:id
 * Method: GET
 * Description: Get book by thier id
 * Access: Public
 * Parmanters: id
 */
router.get("/:id", (req, res) => {
  const { id } = req.params;
  const book = books.find((each) => each.id === id);

  if (!book) {
    return res
      .status(404)
      .json({ success: false, message: "book not exist this id" });
  }
  return res.status(200).json({ success: true, data: book });
});

/**
 * Route: /books/issued/by-user
 * Method: GET
 * Description: Get all issued books
 * Access: Public
 * Parmanters: none
 */

router.get("/issued/by-user", (req, res) => {
  const usersWithIssuedBook = users.filter((each) => {
    if (each.issuedBook) {
      return each;
    }
  });
  const issuedBooks = [];
  usersWithIssuedBook.forEach((each) => {
    const book = books.find((book) => book.id === each.issuedBook);
    book.issuedby = each.name;
    book.issuedDate = each.issuedDate;
    book.returnDate = each.returnDate;

    issuedBooks.push(book);
  });
  if (issuedBooks.length === 0) {
    return res
      .status(404)
      .json({ success: false, message: "no books has been issued" });
  }
  return res.status(200).json({ message: true, data: issuedBooks });
});

/**
 * Route: /books
 * Method: POST
 * Description: Create new book
 * Access: Public
 * Parmanters: none
 */
router.post("/", (req, res) => {
  const { data } = req.body;
  if (!data) {
    return res
      .status(400)
      .json({ success: false, message: "No Data was provided" });
  }
  const book = books.find((each) => each.id === data.id);
  if (book) {
    return res
      .status(404)
      .json({
        success: false,
        message: "Stating books already exist with the same id",
      });
  }
  const allBooks = [...books, data];
  return res.status(200).json({
    success: true,
    data: allBooks,
  });
});

/**
 * Route: /books/:id
 * Method: PUT
 * Description: Updating a book
 * Access: Public
 * Parmanters: id
 */

router.put("/:id", (req, res) => {
  const { id } = req.params;
  const { data } = req.body;
  const book = books.find((each) => each.id === id);
  if (!book) {
    res
      .status(404)
      .json({
        success: false,
        message: "Book Not Found with that perticular id",
      });
  }

  const updatedData = books.map((each) => {
    if (each.id === id) {
      return { ...each, ...data };
    }
    return each;
  });
  res.status(200).json({
    success: true,
    data: updatedData,
  });
});

/**
 * Route:/users/subscription-details/{id}
 * Method: GET
 * Description: Get user subscription details
 * Access: Public
 * Parmanters: id
 */

router.get("/subscription-details/:id", (req, res) => {
  const { id } = req.params;
  const user = users.find((each) => each.id === id);
  if (!user) {
    res.status(404).json({
      success: false,
      message: "user is not found",
    });
  }
  const getDateInDay = (data = "") => {
    let date;
    if (data === "") {
      //current date
      date = new Date();
    } else {
      // getting date on basics of variable
      date = new Date(data);
    }

    let days = Math.floor(data / (1000 * 60 * 60 * 24));
    return days;
  };

  const subscriptionType = (data) => {
    if (users.subscriptionType === "Basic") {
      date = date + 90;
    } else if (users.subscriptionType === "Standard") {
      date = date + 180;
    } else if (users.subscriptionType === "Premium") {
      date = date + 365;
    }
    return date;
  };

  // subscription calc here
  // date always be calculate from jan 1, year 1970 for subscription
  let returnDate = getDateInDay(user.returnDate);
  let currentDate = getDateInDay();
  let subscriptionDate = getDateInDay(user.subscriptionDate);
  let subscriptionExpiration = subscriptionType(subscriptionDate);

  const data = {
    ...user,
    subscriptionExpired : subscriptionExpiration < currentDate,
    daysLeftForExpiration : subscriptionExpiration <= currentDate ? 0 :subscriptionExpiration - currentDate,
    fine : returnDate < currentDate ? subscriptionExpiration <= currentDate ? 200 : 100 : 0,
  };
  return res.status(200).json({success:true, data});
});

//default export
module.exports = router;
