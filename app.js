//all installations and configs
import express from "express"
import { config } from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors"

import { errorMiddleware } from "./middlewares/errorMiddleware.js";
import authRouter from "./routes/authRouter.js"
import bookRouter from "./routes/bookRouter.js"


export const app = express()

config({ path: "./.env" })
app.use(cors())
app.use(cookieParser())

// only works on data not files
app.use(express.json())
app.use(express.urlencoded({ extended: true }))


app.use("/api/v1/auth", authRouter)
app.use("/api/v1/book", bookRouter)









app.use(errorMiddleware)