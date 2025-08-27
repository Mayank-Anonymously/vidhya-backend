const mongoose = require('mongoose');

const querySchema = new mongoose.Schema({
	name: String,
	email: String,
	contact: Number,
	country: String,
	University: String,
});

const QueryModel = mongoose.model('Queries', querySchema);
module.exports = QueryModel;
