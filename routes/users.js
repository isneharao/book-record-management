const express = require("express");
const { users } = require("../data/users.json");
// const { append } = require("express/lib/response");
const { UserModel, BookModel}  = require("../models/server");

const router = express.Router();

const {
  getAllUsers,
  getSingleUserById,
  deleteUser,
  updateUserById,
  createNewUser,
  getSubscriptionDetailsById,
} = require("../controllers/user-controller");


//http://localhost:8082/users/

/* Route:/users
   method:GET
   Description:Get all the users
   access:public
   parameter:none
 */
router.get("/",getAllUsers);

/* Route:/users/:id
    method:GET
    Description:Get the users by their ID
    access:public
    parameter:ID
  */

router.get("/:id", getSingleUserById);

/* Route:/users
    method:post
    Description: create new user
    access:public
    parameter:none
  */

router.post("/",createNewUser);

/* Route:/users/:id
 method:put
 Description: Update a user by ID 
 access:public
 parameter:ID
 */

router.put("/:id",updateUserById);
/* Route:/users/:id
    method:DELETE
    Description: Delete a user by thier ID
    access:public
    parameter:ID
  */

router.delete("/:id", deleteUser);

router.get("/subscription-details/:id", getSubscriptionDetailsById);
//default export
module.exports = router;
