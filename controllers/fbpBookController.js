import { catchAsyncErrors } from "../middlewares/catchAsyncErrors.js"
import { BookModel } from "../models/bookModel.js"
import { UserModel } from "../models/userModel.js"

import ErrorHandler from "../middlewares/errorMiddleware.js"

export const fbpAddBook = catchAsyncErrors(async (req, res, next) => {

    try {
        const { title, author, description, price, quantity, genre, publishedYear } = req.body
        if (!title || !author || !description || !price || !quantity || !genre || !publishedYear) return next(new ErrorHandler("All fields are required", 400))
        const book = await BookModel.create({
            title, author, description, price, quantity, genre, publishedYear, userId: req.user._id
        })
        return res.status(201).json({
            success: true, message: "Book added!", book
        })
    } catch (error) {
        return next(new ErrorHandler(error.message, 500))
    }
})