const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')


const app = express()
const port = process.env.PORT || 3000

const publicDirectory = path.join(__dirname, '../public')
const viewPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

app.set('view engine', 'hbs')
app.set('views', viewPath)
hbs.registerPartials(partialsPath)


app.use(express.static(publicDirectory))

app.get('', (req, res) => {
    res.render('index', {
        title: 'This is Index Page',
        name: 'Kishan Patel'
    })
})
app.get('/about', (req, res) => {
    res.render('about', {
        title: 'This is About Page',
        content: 'About content will go here'
    })
})
app.get('/help', (req, res) => {
    res.render('help', {
        title: 'This is Help Page',
        content: 'Help Content will go here'
    })
})
app.get('/weather', (req, res) => {
    if (!req.query.address) {

        return res.send({
            error: 'Please enter place'
        })
    }

    geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {
        if (error) {
            return res.send({ error })
        }
        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send({ error })
            }
            res.send({
                forecast: forecastData,
                location,
                address: req.query.address
            })
        })

    })
})

app.get('*', (req, res) => {
    res.render('help', {
        title: 'This is 404 Page',
        errormessage: 'Page Not Found'
    })
})

app.listen(port, () => {
    console.log("Server Started")
})