const express = require('express');
const app = express();
const cors = require('cors');
const queryroute = require('./router/Queryrouter');
const path = require('path');
const drouter = require('./router/dynamicPage.js');
const srouter = require('./router/servicesRouter.js');
const crouter = require('./router/countiresPage.js');
const urouter = require('./router/universtiesModel.js');
require('./utils/config.js');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api/v1/query', queryroute);
app.use('/resources', express.static(path.join(__dirname, 'uploads')));
app.use('/api/v1/pages', drouter);
app.use('/api/v1/services', srouter);
app.use('/api/v1/countires', crouter);
app.use('/api/v1/university', urouter);

app.listen(3202);
