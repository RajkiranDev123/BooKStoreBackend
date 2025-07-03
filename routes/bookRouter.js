import { isAuthenticated } from "../middlewares/authMiddleware.js"

import { AddBook, GetAllBooks, DeleteBook ,UpdateBook} from "../controllers/fbpBookController.js"

import express from "express"

const router = express.Router()

//File-Based Persistence routes (fbp)

router.post("/add-book", isAuthenticated, AddBook)

router.get("/get-all-books", isAuthenticated, GetAllBooks)

router.put("/update-book/:id", isAuthenticated, UpdateBook)

router.delete("/delete-book/:id", isAuthenticated, DeleteBook)

















export default router
