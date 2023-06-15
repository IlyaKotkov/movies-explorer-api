require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const { errors } = require('celebrate');
const cors = require('cors');
const helmet = require('helmet');
const corsProcessing = require('./middlewares/corsProcessing');
const routerError = require('./routes/router');
const centralError = require('./middlewares/centralError');
const router = require('./routes');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const limiter = require('./utils/limiter');

const app = express();
mongoose.connect('mongodb://127.0.0.1:27017/bitfilmsdb');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(requestLogger);

app.use(limiter);

app.use(helmet());

app.use(cors(corsProcessing));

app.use(router);

app.use(routerError);

app.use(errorLogger);

app.use(errors());

app.use(centralError);

app.listen(3000);
