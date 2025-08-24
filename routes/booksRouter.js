const express = require("express");
const Book = require("../models/Book");
const bookRouter = express.Router();

//! Create new Book
bookRouter.post("/", async (req, res) => {
try {
    console.log(req.body);
    const { title, author, genre, publishedYear, isAvailable } = req.body;

    //! Check for duplicate book
    const existingBook = await Book.findOne({ title, author });
    if (existingBook) {
    return res.status(409).json({ error: "Book already exists" });
    }

    //! Save the new book
    const book = await Book.create({
    title,
    author,
    genre,
    publishedYear,
     isAvailable,
    });

    //! Send the response to the user
    res.status(201).json(book);
} catch (error) {
    res.status(400).json({ error: error.message });
}
});

//! Fetch all books
bookRouter.get("/", async (req, res) => {
try {
    const books = await Book.find();
    res.status(200).json(books);
} catch (error) {
    res.status(500).json({ error: error.message });
}
});

//! Fetch a single book
bookRouter.get("/:bookId", async (req, res) => {
try {
    const book = await Book.findById(req.params.bookId);
    res.status(200).json(book);
} catch (error) {
    res.status(500).json({ error: error.message });
}
});

//! Delete a book
bookRouter.delete("/:bookId", async (req, res) => {
try {
    await Book.findByIdAndDelete(req.params.bookId);
    res.status(200).json({ message: "Book deleted successfully" });
} catch (error) {
    res.status(500).json({ error: error.message });
}
});

//! Update a book
bookRouter.put("/:bookId", async (req, res) => {
try {
    const bookUpdated = await Book.findByIdAndUpdate(
    req.params.bookId,
    req.body,
    { new: true }
    );
    res.status(200).json(bookUpdated);
} catch (error) {
    res.status(500).json({ error: error.message });
}
});

module.exports = bookRouter;
