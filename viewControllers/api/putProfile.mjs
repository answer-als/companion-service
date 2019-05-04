import log from '../../models/log.mjs';
import storage from '../../models/storage.mjs';

const error = log('api').error;

export const putProfile = (request, response) => {

  const body = request.body;
  const userid = request.params.userid;

  const filename = userid + '.profile';

  storage.write(filename, Buffer.from(JSON.stringify(body), 'utf8'), (err) => {

    if (err) {
      error(err);
      response.status(500).end();
      return;
    }

    response.status(200).end();

  });

};
