const express = require('express');
const urouter = express.Router();

const upload = require('../middleware/pageImageUpload');
const {
	AddNewUniversity,
	GetAllUniversity,
	GetUniversityByUrl,
	GetUniversityByCountryID,
} = require('../controller/universitiesController');

urouter.post('/add', upload.single('file'), AddNewUniversity);
urouter.get('/all', GetAllUniversity);
urouter.get('/:url', GetUniversityByUrl);
urouter.get('/by-category/:_id', GetUniversityByCountryID);

module.exports = urouter;

// http://localhost:3202/api/v1/university/68bf42c2b8fdb2164779ba2c