import jwt from "jsonwebtoken";
import { catchAsyncErrors } from "./catchAsyncErrors.js";
import ErrorHandler from "./errorMiddleware.js";

export const isAuthenticated = catchAsyncErrors(
    async (req, res, next) => {
        const { token } = req.cookies
        if (!token) return next(new ErrorHandler("User is not authenticated!", 400))
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY)
        req.decodedEmail = decoded?.email
        console.log("decoded Email from auth middleware==>", req.decodedEmail)
        next()
    }
)

