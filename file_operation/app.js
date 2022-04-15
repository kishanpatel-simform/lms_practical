const express = require('express')
const multer = require('multer')
const ejs = require('ejs')
const path = require('path')

// Set Storage Engine
const storage = multer.diskStorage({
    destination: './public/uploads/',
    filename: function(req, file, cb) {
        cb(null, file.fieldname + ' - ' + Date.now() + path.extname(file.originalname))
    }
})

//Init Upload
const upload = multer({
    storage: storage,
    limits: { fileSize: 10000000 },
    // fileFilter: function(req, file, cb) {
    //     checkFileType(file, cb)
    // }
}).single('myImage')

// Check File Types

// function checkFileType(file, ch) {
//     const filetypes = /jpeg|jpg|png|gif
//     const extname = filetypes.test(path.extname(file.originalname)).toLowerCase()
// }



//Init
const app = express()
const port = 3000

//EJS
app.set('view engine', 'ejs')

//Public Folder
app.use(express.static('./public'))

app.get('/', (req, res) => res.render('index'))


app.post('/upload', (req, res) => {
    upload(req, res, (err) => {
        if (err) {
            res.render('index', {
                msg: err
            })
        } else {
            if (req.file == undefined) {
                res.render('index', {
                    msg: 'Error : No File Selected  '
                })
            } else {
                res.render('index', {
                    msg: 'File Uploaded',
                    file: `uploads/${req.file.filename}`
                })
            }

        }
    })

})

app.listen(port, () => {
    console.log("Port running on " + port)
})