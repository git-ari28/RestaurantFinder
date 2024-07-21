const mongoose = require('mongoose');
const Restaurant = require('../models/restaurant');
const cities = require('./cities');
const { Names } = require('./restaurantname');
const { images } = require('./images');

mongoose.connect('mongodb://127.0.0.1:27017/findrestaurant');

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
    console.log('Database connected');
});

const sample = array => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
    await Restaurant.deleteMany({});
    for (let i = 0; i < 50; i++) {
        const random500 = Math.floor(Math.random() * cities.length);
        const pricing = Math.floor(Math.random() * 300) + 10;
        const noofpersons = Math.floor(Math.random() * 2) + 1;
        const guide = new Restaurant({
            location: `${cities[random500].city},${cities[random500].state}`,
            name: sample(Names),
            image: sample(images),
            price: `${pricing} for ${noofpersons}`
        });
        await guide.save();
    }
};

seedDB().then(() => {
    mongoose.connection.close();
});


