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

let debug = log('app').debug;
let unhandledError = log('unhandled').error;

let app = express();
app.use(logger(':date[iso] :method :url :status :response-time ms - :res[content-length]'));
app.use(cookieParser('no white flags'));

app.use(express.static('public'));

hbs.registerPartials('./views/partials');
app.set('view engine', 'hbs');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded( { extended: false }));
app.use(bodyParser.raw( { limit: '1000kb' }));

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
