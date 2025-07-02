import { catchAsyncErrors } from "../middlewares/catchAsyncErrors.js"
import { BookModel } from "../models/bookModel.js"
import ErrorHandler from "../middlewares/errorMiddleware.js"
import { readFile, writeFile } from 'fs/promises';
import { v4 as uuidv4 } from 'uuid';

let getDir = process.cwd()

//file based persistence (fbp)

//create book

export const fbpAddBook = catchAsyncErrors(async (req, res, next) => {

    try {
        const { title, author, description, price, quantity, genre, publishedYear } = req.body
        if (!title || !author || !description || !price || !quantity || !genre || !publishedYear) return next(new ErrorHandler("All fields are required", 400))

        const id = uuidv4();
        const filePath = `${getDir}/jsonData/books.json`
        const data = await readFile(filePath, 'utf-8');
        const allBooks = JSON.parse(data);
        let bookObj = await BookModel.create({ ...req.body, id, userId: req.user._id })
        allBooks.books.push(bookObj);
        await writeFile(filePath, JSON.stringify(allBooks, null, 2), 'utf-8');
        return res.status(201).json({
            success: true, message: "Book added !", bookObj
        })
    } catch (error) {
        return next(new ErrorHandler(error.message, 500))
    }
})

//retrieve all books
export const fbpGetAllBooks = catchAsyncErrors(async (req, res, next) => {

    try {
        const filePath = `${getDir}/jsonData/books.json`
        const data = await readFile(filePath, 'utf-8');
        const allBooks = JSON.parse(data);
        return res.status(201).json({
            success: true, message: "All books fetched!", books: allBooks.books
        })
    } catch (error) {
        return next(new ErrorHandler(error.message, 500))
    }
})


//update book
export const fbpUpdateBook = catchAsyncErrors(async (req, res, next) => {

    try {
        const { id } = req.params
        const { title, author, description, price, quantity, genre, publishedYear } = req.body
        if (!title || !author || !description || !price || !quantity || !genre || !publishedYear) return next(new ErrorHandler("All fields are required", 400))

        const filePath = `${getDir}/jsonData/books.json`
        const data = await readFile(filePath, 'utf-8');
        const allBooks = JSON.parse(data);
        const bookIndex = allBooks.books.findIndex(book => book.id === id);
        if (bookIndex === -1) {
            return next(new ErrorHandler("book id not available!", 400))

        }
        allBooks.books[bookIndex] = {
            ...allBooks.books[bookIndex],
            ...req.body
        };
        await writeFile(filePath, JSON.stringify(allBooks, null, 2), 'utf-8');
        return res.status(201).json({
            success: true, message: "book updated!", book: req.body
        })
    } catch (error) {
        return next(new ErrorHandler(error.message, 500))
    }
})

//delete book
export const fbpDeleteBook = catchAsyncErrors(async (req, res, next) => {

    try {
        const { id } = req.params

        const filePath = `${getDir}/jsonData/books.json`
        const data = await readFile(filePath, 'utf-8');
        const allBooks = JSON.parse(data);
        allBooks.books = allBooks.books.filter(book => book.id !== id);
        await writeFile(filePath, JSON.stringify(allBooks, null, 2), 'utf-8');
        return res.status(201).json({
            success: true, message: "book deleted!", books: allBooks.books
        })
    } catch (error) {
        return next(new ErrorHandler(error.message, 500))
    }
})




