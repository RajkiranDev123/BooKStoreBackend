import { isAuthenticated, isAuthorized } from "../middlewares/authMiddleware.js"

import { addBook, getAllBooks, deleteBook, getBookById, updateBookById } from "../controllers/bookController.js"

import { fbpAddBook } from "../controllers/fbpBookController.js"


import express from "express"


const router = express.Router()

router.post("/admin/add", isAuthenticated, isAuthorized("Admin"), addBook)
router.get("/all", isAuthenticated, getAllBooks)
router.get("/get-book/:id", isAuthenticated, getBookById)



router.patch("/update-book/:id", isAuthenticated, isAuthorized("Admin"), updateBookById)


router.delete("/delete/:id", isAuthenticated, isAuthorized("Admin"), deleteBook)

//File-Based Persistence routes (fbp)
router.post("/fbp/admin/add", isAuthenticated, isAuthorized("Admin"), fbpAddBook)














export default router
