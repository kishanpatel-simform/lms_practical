var mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/testdata');

var db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));

db.once('open', function() {
    console.log("Connection Successful!");
});

var BookSchema = mongoose.Schema({
    name: String,
    price: Number,
    quantity: Number
});

var Book = mongoose.model('Book', BookSchema, 'bookstore')

var book1 = new Book({ name: 'Introduction to Mongoose', price: 10, quantity: 25 });
book1.save(function(err, book) {
    if (err) return console.error(err);
    console.log(book.name + " saved to bookstore collection.");
});

var books = [{ name: 'Mongoose Tutorial', price: 10, quantity: 25 },
    { name: 'NodeJS tutorial', price: 15, quantity: 5 },
    { name: 'MongoDB Tutorial', price: 20, quantity: 2 }
];

// save multiple documents to the collection referenced by Book Model
Book.collection.insertMany(books, function(err, docs) {
    if (err) {
        return console.error(err);
    } else {
        console.log("Multiple documents inserted to Collection");
    }
});