const express = require('express')
const path = require('path')
const app = express()
const hbs = require('hbs')
const Request = require('request')
const DarkSkyUrl = 'https://api.darksky.net/forecast/03db7eeb912980f7c4a3f8a81dcabf32/37.8267,-122.4233?units=uk2'
const MapBoxUrl = 'https://api.mapbox.com/geocoding/v5/mapbox.places/Los%20Angeles.json?access_token=pk.eyJ1IjoibHV0ZXJhbiIsImEiOiJjazg3MDRnczAwYWk2M2VwcnM4a2c5a3ZwIn0.tbai7u-BD-uDWYCBnxlkbQ'
const GeoCode = require('./Utils/Geocode')
const DarkSkyReq = require('./Utils/DarkSkyReq')

// define paths for express config
const publicDirPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../mustache/views')
const partialsPath = path.join( __dirname, '../mustache/partials')


const port = process.env.PORT || 3000

// handlebars setup location
app.set('view engine', 'hbs')
app.set( 'views', viewsPath)
hbs.registerPartials(partialsPath)


function respondWithError(res, message) {
    res.status(400).json({ error: message });
}

// setup static
app.use(express.static(publicDirPath))

// home page
app.get( '', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Luke'
    })
})

// about page
app.get( '/about', (req, res) => {
    res.render('about', {
        title: 'About me',
        name: 'Luke'
    })
})

// help page
app.get( '/help', (req, res) => {
    res.render('help', {
        message: 'massage',
        title: 'Help',
        name: 'Luke'
    })
})

// weather page
app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send('Please Provide Address.')
    }
    Address = req.query.address
    async function getWeather(Address) {

        try {
            const { latitude, longitude, location } = await GeoCode(Address);
    
            const { Summary, PrecipChance, Temp } = await DarkSkyReq(longitude, latitude);
    
            res.send({
                data: 'Showing data for : ' + location,
                summary: Summary,
                precipChance: 'Chance of rain: ' + PrecipChance + '%',
                temperature: 'Temperature outside: ' + Temp + '°C',
            })

        } catch (e) {
            respondWithError(res, e.message);
        }
    }
    
    if (Address) {
        getWeather(Address);
    } else {
        res.send('Please add a location in quotes')
    }
})

app.get('/products', (req, res) => {
    if (!req.query.search) {
         return res.send({
            Error: ' Search Term Needed'
        })
    }
    res.send({
        products: []
    })
})


// help page invalid
app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Luke',
        message: 'Help Page Not Found.'
    })
})

// invalid page
app.get('*', (req, res)=> {
    res.render('404', {
        title: '404',
        name: 'Luke',
        message: 'Page Not Found.'
    })
})


app.listen(port, () => {
    console.log('Server up on port ' + port)
})