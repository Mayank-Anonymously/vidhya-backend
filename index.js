const express = require('express');
const app = express();
const cors = require('cors');
const queryroute = require('./router/Queryrouter');
const path = require('path');
const drouter = require('./router/dynamicPage.js');
require('./utils/config.js');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api/v1/query', queryroute);
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use('/api/v1/pages', drouter);

app.listen(3202);
