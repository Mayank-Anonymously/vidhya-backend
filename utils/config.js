const mongoose = require('mongoose');

const mongoURI =
	'mongodb+srv://vidhyaroute_db_user:83563763463466@vidhyaaroute.ndvkcop.mongodb.net/Vidhyaaroute?retryWrites=true&w=majority&appName=Vidhyaaroute';

mongoose.connect(mongoURI);

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
	console.log('Connected to MongoDB successfully!');
});

module.exports = db;
