const express = require('express');
const crouter = express.Router();

const upload = require('../middleware/pageImageUpload');
const {
	AddNewCountries,
	GetAllCountries,
	GetCountriesByUrl,
} = require('../controller/countriesController');

crouter.post('/add', upload.single('file'), AddNewCountries);
crouter.get('/all', GetAllCountries);
crouter.get('/:url', GetCountriesByUrl);

module.exports = crouter;
