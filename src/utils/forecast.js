const request = require('request')

const forecast = (latitude,longetude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=51fe9c967e2fad3063bf6ac4aa224b0d&query='+ latitude +','+ longetude +'&units=f'

    request({url, json:true}, (error, {body}) => {
        if(error){
            callback('Unable to connect to weather service!',undefined)
        } else if(body.error){
            callback('Unable to find Location. Try another search',undefined)
        } else {
            callback(undefined, body.current.weather_descriptions[0] + ', It is currently ' +body.current.temperature +' degress out. It feels like ' +body.current.feelslike +' degress out')
        }
    })

}

module.exports = forecast