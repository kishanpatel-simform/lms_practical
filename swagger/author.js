const mongoose = require('mongoose')

const AuthorSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    }
})

const author = mongoose.model('AuthorSchema', AuthorSchema)
module.exports = author