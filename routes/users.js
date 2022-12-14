const express = require("express");
const { users } = require("../data/users.json");
// const { append } = require("express/lib/response");

const router = express.Router();


//http://localhost:8082/users/

/* Route:/users
   method:GET
   Description:Get all the users
   access:public
   parameter:none
 */
router.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    data: users,
  });
});

/* Route:/users/:id
    method:GET
    Description:Get the users by their ID
    access:public
    parameter:ID
  */

router.get("/:id", (req, res) => {
  const { id } = req.params;
  const user = users.find((each) => each.id === id);
  if (!user) {
    return res.status(404).json({
      success: false,
      message: "user NOT FOUND",
    });
  }
  return res.status(200).json({
    success: true,
    data: user,
  });
});

/* Route:/users
    method:post
    Description: create new user
    access:public
    parameter:none
  */

router.post("/", (req, res) => {
  const { id, name, surname, email, subscriptionType, subscriptionDate } = req.body;
  const user = users.find((each) => each.id === id);
  if (user) {
    return res.status(404).json({ 
      success: false, 
      message: "user is already exist" 
    });
  }
  users.push({
    id,
    name,
    surname,
    email,
    subscriptionType,
    subscriptionDate,
  });
  return res.status(201).json({
    success: true,
    data: users,
  });
});

/* Route:/users/:id
 method:put
 Description: Update a user by ID 
 access:public
 parameter:ID
 */

router.put("/:id", (req, res) => {
  const { id } = req.params;
  const { data } = req.body;
  const user = users.find((each) => each.id === id);
  if (!user) {
    return res.status(404).json({
      success: false,
      message: "user Not found",
    });
  }
  const updateduser = users.map((each) => {
    if (each.id === id) {
      return {
        ...each,
        ...data,
      };
    }
    return each;
  });
  return res.status(200).json({
    success: true,
    data: updateduser,
  });
});
/* Route:/users/:id
    method:DELETE
    Description: Delete a user by thier ID
    access:public
    parameter:ID
  */

router.delete("/:id", (req, res) => {
  const { id } = req.params;
  const user = users.find((each) => each.id === id);
  if (!user) {
    return res.status(404).json({ success: false, message: "user to be deleted Not exist" });
  }
  const index = users.indexOf(user);
  users.splice(index, 1);
  return res.status(200).json({ success: true, data: users });
});

//default export
module.exports = router;
