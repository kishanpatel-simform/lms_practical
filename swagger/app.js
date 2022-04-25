const express = require('express')
const path = require('path')
const app = express()
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const author = require('./author')
const swaggerUI = require('swagger-ui-express')
const YAML = require('yamljs')
const swaggerJsDocs = YAML.load('./app.yaml')

const books = require('./books')

mongoose.connect('mongodb://127.0.0.1:27017/bookstore');

app.use('/', express.static(path.resolve(__dirname, 'public')))
app.use(bodyParser.json())
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerJsDocs))

// For Author 

app.post('/author/create', async(req, res) => {
    try {

        const createAuthor = await author.create(req.body)
        res.status(200).send(createAuthor)
    } catch (e) {
        res.status(500).send(e)
    }
})
app.get('/author', async(req, res) => {
    try {
        const getAuthors = await author.find({})
        res.status(200).send(getAuthors)
    } catch (e) {
        res.status(500).send(e)
    }
})
app.delete('/author/:id', async(req, res) => {
    const _id = req.params.id
    try {
        const deleteAuthor = await author.findByIdAndDelete(_id)
        if (!deleteAuthor) {
            return res.status(400).send()
        }
        res.status(200).send(deleteAuthor)

        console.log("Author has been Deleted")

    } catch (e) {
        res.status(500).send(e)
    }
})

// For Author Books


app.post('/books/create', async(req, res) => {
    try {

        const addBook = await books.create(req.body)
        res.status(200).send(addBook)
    } catch (e) {
        res.status(500).send(e)
    }
})

app.listen(3000, () => {
    console.log("Server is Running up")
})