const mongoose = require('mongoose');
const cities = require('./cities');
const { places, descriptors } = require('./seedHelpers');
const Campground = require('../src/models/campground');

mongoose.connect('mongodb://127.0.0.1:27017/vicamp', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});

const sample = array => array[Math.floor(Math.random() * array.length)];


const seedDB = async () => {
    await Campground.deleteMany({});
    for (let i = 0; i < 300; i++) {
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 20) + 10;
        const camp = new Campground({
            author: '6168169ee8fb913388d67788',
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            description: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Soluta doloribus sunt eligendi, exercitationem incidunt quam architecto reprehenderit modi optio nemo molestias placeat itaque odio fugiat accusantium libero deserunt magnam quo!',
            price,
            geometry: {
                type: 'Point',
                coordinates: [
                    cities[random1000].longitude,
                    cities[random1000].latitude
                ]
            },
            images: [
                {
                    url: 'https://res.cloudinary.com/my-camp-image/image/upload/v1634199523/samples/food/fish-vegetables.jpg',
                    filename: 'vicamp/reindeer'
                },
                {
                    url: 'https://res.cloudinary.com/my-camp-image/image/upload/v1634454554/vicamp/cy4bnku5fodg9ofvro8i.jpg',
                    filename: 'vicamp/nature-mountains'
                },
                {
                    url: 'https://res.cloudinary.com/my-camp-image/image/upload/v1634454574/vicamp/f1emekmjoiuqy1eivr2b.jpg',
                    filename: 'vicamp/architecture-signs'
                },
                {
                    url: 'https://res.cloudinary.com/my-camp-image/image/upload/v1634454391/vicamp/sv9trexs6vprueuejkek.jpg',
                    filename: 'vicamp/girl-urban-view'
                }
            ]
        })
        await camp.save();
    }
}

seedDB().then(() => {
    mongoose.connection.close();
})