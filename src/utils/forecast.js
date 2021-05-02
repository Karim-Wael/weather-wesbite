const request = require('request');

const forecast = (latitude, longitude, callback) => {
  const url = 'http://api.weatherstack.com/current?access_key=57e8d325bc5aa1fa099d9befefc1b357&query='+ latitude +',' + longitude;

  request({url, json: true },(error,{body})=>{
  
    if(error){
      callback('Unable to connect to weather servcie!', undefined);
    }else if(body.error){
      callback('Unable to find location', undefined);
    }else{
      callback(undefined,'The weather is '+ body.current.weather_descriptions[0] +'. The temperature is ' + body.current.temperature + '. It feels like ' + body.current.feelslike + ' out there. There is ' + body.current.precip + '% chance of rain. The humidity is ' + body.current.humidity + '%.');
    }
    
  });
};

module.exports = forecast;