

const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended : false }));

require('./controllers/authController')(app);
require('./controllers/projetctController')(app);

app.get('/', (req, res) => {
    res.send('xxx');
});

app.listen(3333);