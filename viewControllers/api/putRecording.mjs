import log from '../../models/log.mjs';
import storage from '../../models/storage.mjs';
import moment from 'moment';

const error = log('api').error;

export const putRecording = (request, response) => {

  const buffer = request.body;
  const userid = request.params.userid;
  const hash = request.params.hash;

  const filename = userid + '-' + hash + '-' + moment().format('YYYYMMDD-HHmmss-SSS') + '.m4a';

  storage.write(filename, buffer, (err) => {

    if (err) {
      error(err);
      response.status(500).end();
      return;
    }

    response.status(200).end();

  });

};
