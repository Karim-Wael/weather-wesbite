const path = require('path');
const express = require('express');
const hbs = require('hbs');

const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

const app = express();
const port = process.env.PORT || 3000;

//Define paths for express config
const publicDirPath = path.join(__dirname,'../public');
const viewsPath = path.join(__dirname,'../templates/views');
const partialsPath = path.join(__dirname,'../templates/partials'); 

//Setup handlebars engine and views location
app.set('view engine','hbs')
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

//Setup static directory to serve
app.use(express.static(publicDirPath));


app.get('',(req,res)=>{
  res.render('index',{
    title: 'Weather App',
    name: 'Karim Wael'
  });
});
app.get('/about',(req,res)=>{
  res.render('about', {
    title: 'About Me',
    name: 'Karim Wael'
  });
});
app.get('/help',(req,res)=>{
  res.render('help', {
    title: 'Help Page',
    description: 'This is where you can reach for our help',
    name: 'Karim Wael'
  });
});
app.get('/weather', (req, res) => {
  
  if(!req.query.address){
   return  res.send({
     error: 'Please provide an address.'
   });
  }
  const address = req.query.address;
  geocode(address,(error, {latitude, longitude, location} = {})=>{
  
    if(error){
      return res.send({error});
    }
    forecast(latitude, longitude, (error, forecastData) => {
      if(error){
        return res.send({error});
      }
      res.send({
        location,
        weather: forecastData,
        address,
      });
    });
    
  });
});

app.get('/help/*', (req, res)=>{
  res.render('404', {
    title: '404',
    error: 'Help article not found.',
    name: 'Karim Wael',
  });
});
app.get('*', (req, res)=>{
  res.render('404', {
    title: 'Error: 404',
    error: 'Page not found.',
    name: 'Karim Wael',
  });
});
app.listen(port, ()=>{
  console.log('Server is up and running on port ' + port);
});