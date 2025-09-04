const express = require('express');
const urouter = express.Router();

const upload = require('../middleware/pageImageUpload');
const {
	AddNewUniversity,
	GetAllUniversity,
	GetUniversityByUrl,
} = require('../controller/universitiesController');

urouter.post('/add', upload.single('file'), AddNewUniversity);
urouter.get('/all', GetAllUniversity);
urouter.get('/:url', GetUniversityByUrl);

module.exports = urouter;
