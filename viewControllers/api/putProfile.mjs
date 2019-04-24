import fs from 'fs';

const storageDir = '/data/companionservice/';

if (!fs.existsSync(storageDir)) {
  fs.mkdirSync(storageDir);
}

export const putProfile = (request, response) => {

  const body = request.body;
  const userid = request.params.userid;

  fs.writeFileSync(storageDir + userid + '.profile', JSON.stringify(body));

  response.status(200).end();

};
