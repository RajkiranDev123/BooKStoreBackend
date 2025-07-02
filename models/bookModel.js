import mongoose from "mongoose"

const bookSchema = new mongoose.Schema({

    title: {
        type: String,
        required: true,
        trim: true
    },
    author: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: true,
        trim: true
    },
    price: {
        type: Number,
        required: true,
    },

    quantity: {
        type: Number,
        required: true,

    },
    publishedYear: {
        type: Number,
        required: true,

    },
    genre: {
        type: String,
        required: true,
        trim: true
    },
    availability: {
        type: Boolean,
        default: true
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }

}, { timestamps: true })

export const BookModel = mongoose.model("Book", bookSchema)