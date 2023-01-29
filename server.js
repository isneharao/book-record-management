const express = require("express"); 

// import db connection files
const Dbconnection = require("./databaseConnection");

//  import db
const dotenv = require("dotenv");

// const {UserModel,BookModel} = require("../")

// import routes
const usersRouter = require("./routes/users");
const booksRouter = require("./routes/books.js");

dotenv.config();

const app =express();
Dbconnection();

const port = 8082;

app.use(express.json());


app.get("/", (req,res) => {
   res.status(200).json({
      message:"Server is setUp and running successfully",
   });
});

//http://localhost:8082/users/

app.use("/users", usersRouter);
app.use("/books",booksRouter);



app.get("*" , (req,res) => {
   res.status(404).json({
      message : "this route does't exist",
   });
});

app.listen(port , () => {
    console.log(`server is running on port ${port}`);
 });