const mongoose = require('mongoose');


mongoose.connect(process.env.MONGODB_URL, { useNewUrlParser: true });
const conn = mongoose.connection;
mongoose.connection.once('open', () => { console.log('MongoDB Connected'); });
mongoose.connection.on('error', (err) => { console.log('MongoDB connection error: ', err); });





