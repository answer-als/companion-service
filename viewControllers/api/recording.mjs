import moment from 'moment';
import log from '../../models/log.mjs';
import storage from '../../models/storage.mjs';

const error = log('api').error;

function getRecording (request, response) {

  const queryHash = request.params.hash;

  const friendlyName = storage.hashLookup(queryHash);

  response.append('Content-Type', 'application/x-counting-task');
  response.append('Friendly-Name', friendlyName);
  response.status(200).end();

};

function putRecording (request, response) {

  const buffer = request.body;
  const userid = request.params.userid;
  const hash = request.params.hash;

  const friendlyName = storage.hashLookup(hash);

  const filename = userid + '_' + friendlyName + '_' + moment().format('YYYYMMDD-HHmmss-SSS') + '.m4a';

  storage.write(filename, buffer, (err) => {

    if (err) {
      error(err);
      response.status(500).end();
      return;
    }

    response.status(200).end();

  });

};

export { getRecording, putRecording }
