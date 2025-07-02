import { isAuthenticated } from "../middlewares/authMiddleware.js"



import { fbpAddBook, fbpGetAllBooks, fbpDeleteBook } from "../controllers/fbpBookController.js"


import express from "express"


const router = express.Router()



//File-Based Persistence routes (fbp)
router.post("/fbp/admin/add-book", isAuthenticated, fbpAddBook)

router.get("/fbp/admin/get-all-books", isAuthenticated, fbpGetAllBooks)
// test it : http://localhost:3000/api/v1/book/fbp/admin/get-all-books?genreancient=&page=2&limit=10

router.delete("/fbp/admin/delete-book/:id", isAuthenticated, fbpDeleteBook)
router.delete("/fbp/admin/update-book/:id", isAuthenticated, fbpDeleteBook)

















export default router
