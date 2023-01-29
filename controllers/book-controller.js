const { UserModel , BookModel } = require("../models/server");
const IssuedBook = require("../dtos/book-dtos");
// const bookModel = require("../models/book-model");

exports.getAllBooks = async (req, res) => {
    const books = await BookModel.find();
    if(books.length === 0){
        return res.status(404).json({
            success:false,
            message:"No book found"
        });
    }
    res.status(200).json({
      success: true,
      data: books,
    });
  };

exports.getSingleBooksById = async (req, res) => {
  const { id } = req.params;
  const book = await BookModel.findById(id);

  if (!book) {
    return res
      .status(404)
      .json({ success: false, message: "book not exist this id" });
  }
  return res.status(200).json({ success: true, data: book });
}

exports.getAllIssuedBooks = async (req, res) => {
  const users = await BookModel.find({
    issuedBook: { $exists: true},
  }).populate("issuedBook");

  //DTOs => Data Transfer Object
  const issuedBooks = users.map((each) => new IssuedBook(each));
  if (issuedBooks.length === 0) {
    return res
      .status(404)
      .json({ success: false, message: "no books has been issued" });
  }
  return res.status(200).json({ message: true, data: issuedBooks });
};

exports.addNewBook = async (req, res) => {
  const { data } = req.body;
  if (!data) {
    return res
      .status(400)
      .json({ success: false, message: "No Data was provided" });
  }

  await BookModel.create(data);

  const allBooks = await BookModel.find();

  // if (book) {
  //   return res
  //     .status(404)
  //     .json({
  //       success: false,
  //       message: "Stating books already exist with the same id",
  //     });
  // }
  return res.status(200).json({
    success: true,
    data: allBooks,
  });
}

exports.updateBookById = async (req, res) => {
  const { id } = req.params;
  const { data } = req.body;

  const updatedBook = await BookModel.findOneAndUpdate({ _id: id},data,{
    new: true,
  });
  return res.status(200).json({
    success: true,
    data: updatedBook,
  });
};