const express = require("express");
const bookRouter = require("./routes/booksRouter");
const connectDB = require("./config/dbConnect");
const app = express();
const PORT = 5000;

//! Middlewares
app.use(express.json()); // Pass JSON data

//! Routes
app.use('/api/v1/books', bookRouter)

//! Connect to DB
connectDB()

//! Start the server
app.listen(PORT, console.log(`Server is running on the port... ${PORT}`));
