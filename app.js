require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const { errors } = require('celebrate');
const cors = require('cors');
const corsProcessing = require('./middlewares/corsProcessing');
const routerError = require('./routes/router');
const centralError = require('./middlewares/centralError');
const users = require('./routes/users');
const movies = require('./routes/movies');
const authorize = require('./routes/authorize');
const { requestLogger, errorLogger } = require('./middlewares/logger');

const app = express();
mongoose.connect('mongodb://127.0.0.1:27017/kotDiplomDB');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(requestLogger);

app.use(cors(corsProcessing));

app.use(authorize);

app.use(users);
app.use(movies);

app.use(errorLogger);
app.use(routerError);

app.use(errors());

app.use(centralError);

app.listen(3000);
