import fs from 'fs';
import moment from 'moment';

const storageDir = '/data/companionservice/';

if (!fs.existsSync(storageDir)) {
  fs.mkdirSync(storageDir);
}

export const putRecording = (request, response) => {

  const buffer = request.body;
  const userid = request.params.userid;
  const hash = request.params.hash;

  fs.writeFileSync(storageDir + userid + '-' + hash + '-' + moment().format('YYYYMMDD-HHmmss-SSS'), buffer);

  response.status(200).end();

};
