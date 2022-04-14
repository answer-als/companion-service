'use strict';
import 'dotenv/config';

import assert from 'assert';

import log from './models/log.mjs';

import home from './routes/home.mjs';
import api from './routes/api.mjs';

import express from 'express';
import logger from 'morgan';
import hbs from 'hbs';
import bodyParser from 'body-parser';
import cors from 'cors';
import cookieParser from 'cookie-parser';

// ENVIRONTMENT VARIABLES
// const environment = process.env.NODE_ENV;

const AZURE_STORAGE_ACCOUNT = process.env.AZURE_STORAGE_ACCOUNT;
const AZURE_STORAGE_ACCESS_KEY = process.env.AZURE_STORAGE_ACCESS_KEY;

// const STORAGE_DIR = process.env.STORAGE_DIR || '/data/companionservice/';
// const STORAGE_AZURE_BLOB_CONTAINER = process.env.STORAGE_AZURE_BLOB_CONTAINER || 'companionservice';

assert(AZURE_STORAGE_ACCOUNT, 'AZURE_STORAGE_ACCOUNT environment variable must be set');
assert(AZURE_STORAGE_ACCESS_KEY, 'AZURE_STORAGE_ACCESS_KEY environment variable must be set');

// DEBUG AND ERROR SETUP
let debug = log('app').debug;
let unhandledError = log('unhandled').error;

// EXPRESS CONFIGURATION
let app = express();
app.use(logger(':date[iso] :method :url :status :response-time ms - :res[content-length]'));
app.use(cookieParser('no white flags'));

app.use(express.static('public'));

hbs.registerPartials('./views/partials');
app.set('view engine', 'hbs');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded( { extended: false }));
app.use(bodyParser.raw( { limit: '10000kb' }));

app.use(cors());

app.use('/', home);
app.use('/', api);

/// Not found, send 404
app.use( (req, res, next) => { // eslint-disable-line no-unused-vars

  res.status(404).end();

});

/// Unexpected server error handler
app.use( (err, req, res, next) => { // eslint-disable-line no-unused-vars

  // First two lines of the stack trace (exception message and line it occcurred)
  var shortError = err.stack.split('\n').slice(0, 2).map(_ => _.trim()).join(' ');
  unhandledError(shortError);
  res.status(500).end();

});

app.set('port', process.env.PORT || 3000);

var server = app.listen(app.get('port'), () => {
  debug('Listening on ' + server.address().port);
});


//Manual Docker Build and Push:
//docker build -f .\Dockerfile -t aals-companion-service:release.20220408-1 .
//echo "$MY_PASSWORD" | docker login  aucincacr.azurecr.io -u AucIncACR --password-stdin
//docker tag aals-companion-service:release.20220408-1 aucincacr.azurecr.io/aals-companion-service:release.20220408-1
//docker push aucincacr.azurecr.io/aals-companion-service:release.20220408-1
