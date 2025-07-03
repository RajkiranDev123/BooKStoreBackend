import { catchAsyncErrors } from "../middlewares/catchAsyncErrors.js"

import ErrorHandler from "../middlewares/errorMiddleware.js"
import { readFile, writeFile } from 'fs/promises';
import { v4 as uuidv4 } from 'uuid';

let getDir = process.cwd()

//file based persistence (fbp)

//create book

export const AddBook = catchAsyncErrors(async (req, res, next) => {

    try {
        const { title, author, description, price, quantity, genre, publishedYear } = req.body
        if (!title || !author || !description || !price || !quantity || !genre || !publishedYear) return next(new ErrorHandler("All fields are required", 400))
        console.log(req.decodedEmail)

        const id = uuidv4();
        const filePath = `${getDir}/jsonData/books.json`
        const data = await readFile(filePath, 'utf-8');
        const allBooks = JSON.parse(data);
        let bookObj = { ...req.body, id: id }
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
export const GetAllBooks = catchAsyncErrors(async (req, res, next) => {
    const genre = req.query.genre || ""
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;

    try {

        const filePath = `${getDir}/jsonData/books.json`
        const data = await readFile(filePath, 'utf-8');
        const allBooks = JSON.parse(data);

        let result = genre ? allBooks.books.filter(e => e.genre.toLowerCase() == genre.toLowerCase()) : allBooks.books
        const start = (page - 1) * limit;
        const end = start + limit;
        const finalResult = result.slice(start, end);
        return res.status(201).json({
            success: true, message: "All books fetched!", books: finalResult
        })
    } catch (error) {
        return next(new ErrorHandler(error.message, 500))
    }
})


//update book
export const UpdateBook = catchAsyncErrors(async (req, res, next) => {

    try {
        const { id } = req.params
        
        const { title, author, description, price, quantity, genre, publishedYear } = req.body
        if (!title || !author || !description || !price || !quantity || !genre || !publishedYear) return next(new ErrorHandler("All fields are required", 400))

        const filePath = `${getDir}/jsonData/books.json`
        const data = await readFile(filePath, 'utf-8');
        const allBooks = JSON.parse(data);
        const bookIndex = allBooks.books.findIndex(book => book.id === id);
        console.log("bookIndex==>",bookIndex)
        if (bookIndex === -1) {
            return next(new ErrorHandler("book id is not available!", 400))

        }
        allBooks.books[bookIndex] = {
            ...allBooks.books[bookIndex],
            ...req.body
        };
        await writeFile(filePath, JSON.stringify(allBooks, null, 2), 'utf-8');
        return res.status(201).json({
            success: true, message: "Book Updated!", book: req.body
        })
    } catch (error) {
        return next(new ErrorHandler(error.message, 500))
    }
})

//delete book
export const DeleteBook = catchAsyncErrors(async (req, res, next) => {

    try {
        const { id } = req.params

        const filePath = `${getDir}/jsonData/books.json`
        const data = await readFile(filePath, 'utf-8');
        const allBooks = JSON.parse(data);

        const bookIndex = allBooks.books.findIndex(book => book.id === id);
        console.log("bookIndex==>",bookIndex)
        if (bookIndex === -1) {
            return next(new ErrorHandler("Book is not available!", 400))
        }

        allBooks.books = allBooks.books.filter(book => book.id !== id);
        console.log(allBooks.books)
        await writeFile(filePath, JSON.stringify(allBooks, null, 2), 'utf-8');
        return res.status(201).json({
            success: true, message: "Book Deleted!", books: allBooks.books
        })
    } catch (error) {
        return next(new ErrorHandler(error.message, 500))
    }
})




