const express = require('express');
const { sendQuery } = require('../controller/QueryController');
const queryroute = express.Router();

queryroute.post('/raise-query', sendQuery);

module.exports = queryroute;
