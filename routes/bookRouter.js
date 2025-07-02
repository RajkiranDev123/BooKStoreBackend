import { isAuthenticated, isAuthorized } from "../middlewares/authMiddleware.js"

import { addBook, getAllBooks, deleteBook, getBookById, updateBookById } from "../controllers/bookController.js"

import { fbpAddBook, fbpGetAllBooks, fbpDeleteBook } from "../controllers/fbpBookController.js"


import express from "express"


const router = express.Router()

// db based persistence
router.post("/admin/add", isAuthenticated, isAuthorized("Admin"), addBook)
router.get("/all", isAuthenticated, getAllBooks)
router.get("/get-book/:id", isAuthenticated, getBookById)
router.patch("/update-book/:id", isAuthenticated, isAuthorized("Admin"), updateBookById)
router.delete("/delete/:id", isAuthenticated, isAuthorized("Admin"), deleteBook)

//File-Based Persistence routes (fbp)
router.post("/fbp/admin/add-book", isAuthenticated, isAuthorized("Admin"), fbpAddBook)

router.get("/fbp/admin/get-all-books", isAuthenticated, isAuthorized("Admin"), fbpGetAllBooks)
// test it : http://localhost:3000/api/v1/book/fbp/admin/get-all-books?genreancient=&page=2&limit=10

router.delete("/fbp/admin/delete-book/:id", isAuthenticated, isAuthorized("Admin"), fbpDeleteBook)
router.delete("/fbp/admin/update-book/:id", isAuthenticated, isAuthorized("Admin"), fbpDeleteBook)

















export default router
