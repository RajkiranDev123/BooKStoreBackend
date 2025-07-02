import jwt from "jsonwebtoken";
import { catchAsyncErrors } from "./catchAsyncErrors.js";
import ErrorHandler from "./errorMiddleware.js";



export const isAuthenticated = catchAsyncErrors(
    async (req, res, next) => {
        console.log("cookie==>",req.cookies)
        const { token } = req.cookies
        if (!token) return next(new ErrorHandler("User is not authenticated!", 400))
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY)
        console.log("from isAuthenticated==>", decoded)

        





        // req.user=decoded
        req.user = await UserModel.findById(decoded?.id)
        console.log("user from auth middleware==>",req.user)
        next()
    }
)

