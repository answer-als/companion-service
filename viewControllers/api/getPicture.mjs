import fs from 'fs';
import crypto from 'crypto';
import appRoot from 'app-root-path';

export const getPicture = (request, response) => {

  const sha1sum = crypto.createHash('sha1');

  const photos = fs.readdirSync(appRoot + '/public/photos');
  const index = Math.floor(Math.random() * (photos.length));

  const photo = fs.readFileSync(appRoot + '/public/photos/' + photos[index]);

  sha1sum.update(photo);
  const hash = sha1sum.digest('hex');

  response.status(200).append('hash', hash).end(photo);

};
