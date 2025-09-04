const express = require('express');
const srouter = express.Router();

const upload = require('../middleware/pageImageUpload');
const {
	AddNewService,
	GetAllService,
	GetServicesByUrl,
} = require('../controller/servicesController');

srouter.post('/add', upload.single('file'), AddNewService);
srouter.get('/all', GetAllService);
srouter.get('/:url', GetServicesByUrl);

module.exports = srouter;
