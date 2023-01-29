const express = require("express");
const {
  getAllBooks ,
  getSingleBooksById,
  getAllIssuedBooks, 
  addNewBook,
  updateBookById,} = require("../controllers/book-controller");
  
const { books } = require("../data/books.json");
const { users } = require("../data/users.json");
const { UserModel, BookModel } = require("../models/server");

const router = express.Router();

/**
 * Route: /books
 * Method: GET
 * Description: Get all the books
 * Access: Public
 * Parmanters: none
 */
router.get("/", getAllBooks);

/**
 * Route: /books/:id
 * Method: GET
 * Description: Get book by thier id
 * Access: Public
 * Parmanters: id
 */
router.get("/:id", getSingleBooksById);

/**
 * Route: /books/issued/by-user
 * Method: GET
 * Description: Get all issued books
 * Access: Public
 * Parmanters: none
 */

router.get("/issued/by-user", getAllIssuedBooks);

/**
 * Route: /books
 * Method: POST
 * Description: Create new book
 * Access: Public
 * Parmanters: none
 */
router.post("/", addNewBook);

/**
 * Route: /books/:id
 * Method: PUT
 * Description: Updating a book
 * Access: Public
 * Parmanters: id
 */

router.put("/:id", updateBookById);

/**
 * Route:/users/subscription-details/{id}
 * Method: GET
 * Description: Get user subscription details
 * Access: Public
 * Parmanters: id
 */


// router.get("/subscription-details/:id", (req, res) => {
//   const { id } = req.params;
//   const user = users.find((each) => each.id === id);
//   if (!user) {
//     res.status(404).json({
//       success: false,
//       message: "user is not found",
//     });
//   }
//   const getDateInDay = (data = "") => {
//     let date;
//     if (data === "") {
//       //current date
//       date = new Date();
//     } else {
//       // getting date on basics of variable
//       date = new Date(data);
//     }

//     let days = Math.floor(data / (1000 * 60 * 60 * 24));
//     return days;
//   };

//   const subscriptionType = (data) => {
//     if (users.subscriptionType === "Basic") {
//       date = date + 90;
//     } else if (users.subscriptionType === "Standard") {
//       date = date + 180;
//     } else if (users.subscriptionType === "Premium") {
//       date = date + 365;
//     }
//     return date;
//   };

//   // subscription calc here
//   // date always be calculate from jan 1, year 1970 for subscription
//   let returnDate = getDateInDay(user.returnDate);
//   let currentDate = getDateInDay();
//   let subscriptionDate = getDateInDay(user.subscriptionDate);
//   let subscriptionExpiration = subscriptionType(subscriptionDate);

//   const data = {
//     ...user,
//     subscriptionExpired : subscriptionExpiration < currentDate,
//     daysLeftForExpiration : subscriptionExpiration <= currentDate ? 0 :subscriptionExpiration - currentDate,
//     fine : returnDate < currentDate ? subscriptionExpiration <= currentDate ? 200 : 100 : 0,
//   };
//   return res.status(200).json({success:true, data});
// });

//default export
module.exports = router;
