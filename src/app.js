const express = require('express');
const path = require('path');
const hbs = require('hbs');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast')



const app = express();
const port = process.env.PORT || 3000

// Define paths for express config
const publicDirectoryPath = path.join(__dirname, '../public/');
const viewPath = path.join(__dirname, '../templates/views');
const partialPath = path.join(__dirname, '../templates/partials/')

// setup handlebars engine and views location
app.set('view engine', 'hbs');
app.set('views', viewPath);
hbs.registerPartials(partialPath);

// setup static directory to serve
app.use(express.static(publicDirectoryPath));

app.get('', (req, res)=>{
    res.render('index', {
        title: 'Weather',
        name: 'Xiaoping Li'
    });
})


app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About me',
        name: 'Xiaoping'
    })
})

app.get('/help', (req, res)=>{
    res.render('help', {
        message: "This is the help page",
        title:'Help',
        name: 'Xiaoping'
    })
})

app.get('/weather', (req, res)=>{

    if(!req.query.address){
        return res.send({
            error: "Must provide an address"
        })
    }

    const address = req.query.address;

    geocode(address, (error, {latitude, longitude, location} = {})=>{

        if(error){
            return res.send({
                error: 'invalid address'
            })
        }


        forecast(latitude, longitude, (error, forecastData)=>{

            if(error){
                return res.send({
                    error: 'error occured'
                })
            }

            res.send({
                title: 'Weather',
                location: location,
                forecast: forecastData,
                address: req.query.address
            })

        })



    })


});





app.get('/help/*', (req, res) => {
    res.render('error', {
        title: "404",
        message: 'Help article is not found'
    })
})


app.get('*', (req, res)=>{
    res.render('error', {
        title: "404",
        message: 'Page not found'
    })
})

app.listen(port, ()=>{
    console.log(`Server is up on port ${port}.`);
    
});



