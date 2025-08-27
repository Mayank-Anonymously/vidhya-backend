const express = require('express');
const drouter = express.Router();
const {
	AddNewPage,
	GetAllPage,
	GetpageByUrl,
} = require('../controller/dynamicPages');
const upload = require('../middleware/pageImageUpload');

drouter.post('/add', upload.single('file'), AddNewPage);
drouter.get('/all', GetAllPage);
drouter.get('/:url', GetpageByUrl);

module.exports = drouter;
