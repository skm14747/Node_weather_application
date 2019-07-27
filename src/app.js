const path = require('path');
const express = require('express');
const hbs = require('hbs');
const weather = require('./util/weather.js');

const port = process.env.PORT || 3000;

const app = express();
const publicDirectoryPath = path.join(__dirname, '../public');

const viewPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

console.log(partialsPath);

app.set('view engine', 'hbs');
app.set('views', viewPath);

hbs.registerPartials(partialsPath);

app.use(express.static(publicDirectoryPath));

app.get('', (req, res) => {
  res.render('index', {
    title: 'App Home',
    name: 'sandeep'
  });
});

app.get('/about', (req, res) => {
  res.render('about', {
    title: 'About App',
    name: 'sandeep'
  });
});

app.get('/products', (req, res) => {
  res.send({
    products: []
  });
});

app.get('/weather', (req, res) => {
  // console.log(1,!req.query.address);

  if (!req.query.address) {
    let data = {
      title: 'Weather',
      forcast: 'Address must be given',
      location: 'Error'
    };
    if(req.query.json) return res.json(data);
    console.log(2,!req.query.address,"asdf");
    return res.send(data);
  } else { 
    // console.log(3,!req.query.address);
    weather.weatherReporter(req.query.address, (err, response) => {
      console.log(err,response);
      
      if (err) {
        return res.send({
          title: 'Weather',
          forcast: err,
          location: 'Error'
        });
      } else {
        res.send( {
          title: 'Weather',
          forcast: response,
          location: req.query.address
        });
      }
    });
  }
});

app.get('/about/*', (req, res) => {
  res.send('about article not found');
});

app.get('*', (req, res) => {
  res.render('404', {
    title: 'Page Not Found',
    errorMessage: 'sandeep'
  });
});

app.listen(port, () => {
  console.log(`server is listing on ${port} port`);
});
