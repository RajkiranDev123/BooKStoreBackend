import ErrorHandler from "../middlewares/errorMiddleware.js"
import { catchAsyncErrors } from "../middlewares/catchAsyncErrors.js"
import { readFile, writeFile } from 'fs/promises';
import { v4 as uuidv4 } from 'uuid';

import bcrypt from "bcrypt"
let getDir = process.cwd()

export const register = catchAsyncErrors(

    async (req, res, next) => {
        try {
            const { email, password } = req.body
            if (!email || !password) {
                return next(new ErrorHandler("All fields are required!", 400))
            }

            if (password.length < 5 || password.length > 10) {
                return next(new ErrorHandler("Password must be between 8 & 10 characters!", 400))
            }
            const hashedPassword = await bcrypt.hash(password, 10)
            req.body.password = hashedPassword

            const id = uuidv4();
            const filePath = `${getDir}/jsonData/auth.json`
            const data = await readFile(filePath, 'utf-8');
            const allUsers = JSON.parse(data);
            const filterData = allUsers.users.filter(e => e?.email === email)
            if (filterData?.length > 0) return next(new ErrorHandler("User already exists!", 400))
            let userObj = { ...req.body, id: id }
            allUsers.users.push(userObj);
            await writeFile(filePath, JSON.stringify(allUsers, null, 2), 'utf-8');
            return res.status(201).json({
                success: true, message: "User is Registered!"
            })

        } catch (error) {
            next(error)
        }

    },
)

export const login = catchAsyncErrors(
    async (req, res, next) => {

        const { email, password } = req.body
        if (!email || !password) {
            return next(new ErrorHandler("All fields are required!", 400))
        }
        try {
            const filePath = `${getDir}/jsonData/auth.json`
            const data = await readFile(filePath, 'utf-8');
            const allUsers = JSON.parse(data);
            const filterDataUser = allUsers.users.filter(e => e?.email === email)[0]


            if (!filterDataUser) {
                return next(new ErrorHandler("User does not exists!", 400))
            }
            const isPasswordMatched = await bcrypt.compare(password, filterDataUser.password)
            if (!isPasswordMatched) {
                return next(new ErrorHandler("Invalid password!", 400))
            }
            return res.status(200).json({
                success: true, message: "logged-in successfully!", filterDataUser
            })

        } catch (error) {
            return next(new ErrorHandler("Internal Server Error!", 500))
        }


    }
)