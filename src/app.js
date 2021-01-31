const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

// console.log(__dirname)
// console.log(path.join(__dirname, '../public'))


const app = express()
const port = process.env.PORT || 3000

//Define paths for Express config
const publicDirectryPath = path.join(__dirname, '../public')
const viewPath = path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname,'../templates/partials')

//Setup hangelbars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewPath)
hbs.registerPartials(partialsPath)

//Setup datic directory to serve
app.use(express.static(publicDirectryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Dhruti Patel'
    })
})

app.get('/about', (req,res) => {
    res.render('about',{
        title: 'About Me',
        name: 'Dhruti Patel'
    })
})

app.get('/help', (req,res) => {
    res.render('help',{
        title: 'Help',
        name: 'Dhruti',
        helpText: 'This is some helful Text'
    })
})

// app.com

// app.get('',(req, res) => { 
//     res.send('<h1>Hello express!</h1>')
// })


app.get('/help',(req,res) => {
    // res.send('help page')
    // res.send({
    //     name: 'Dhruti',
    //     age: 24
    // })
    res.send([{
        name: 'Dhruti',
        age: 24
    },
    {
        name:'hello'
    }])
})

// app.get('/about', (req,res) =>{
//     res.send('<h1>about us</h1>')
// })

app.get('/weather', (req,res) => {
    if(!req.query.address){
        return res.send({
            error:'you must provide address'
        })
    }
    const address = req.query.address
    geocode(address, (error, {latitude, longitude, location } = {})  =>{
        if(error){
            return res.send({ error})
        }
        
        forecast(latitude, longitude , (error, forecastData) => {
            if(error){
                return res.send({ error})
            }
            console.log(location)
            console.log(forecastData) 
            res.send({
                forcast: forecastData,
                // location: location,
                location,
                address: req.query.address
            }) 
         })
    })
    
})

app.get('/products',(req, res) => {
    if (!req.query.search){
        return res.send({
            error: 'you must provide a search term'
        })
    }
    console.log(req.query.search)
    res.send({
        products: []
    })
})

app.get('/help/*', (req,res) => {
    // res.send('Help artical not found') 
    res.render('404',{
        title: '404 Page',
        errorMessage : 'Help artical not found',
        name: 'Dhruti'
    })
})

app.get('*', (req, res) => {
    // res.send('My 404 Page')
    res.render('404',{
        title: '404 Page',
        errorMessage : 'Page Not Found',
        name: 'Dhruti'
    })
})

app.listen(port, () => {
    console.log('Server is up on port ' +port)
})
