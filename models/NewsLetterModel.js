const mongoose = require("mongoose")
const {isEmail} = require('validator');

const NewsLetterSchema = new mongoose.Schema(
    {
        email: {
            type: String,
            required: true,
            validate: [isEmail],
            lowercase: true,
            unique: true,
            trim: true,
        }
    },
    { timestamps: true }
)

module.exports = mongoose.model("newsLetter", NewsLetterSchema)