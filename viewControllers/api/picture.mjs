import fs from 'fs';
import appRoot from 'app-root-path';
import User from '../../models/user.mjs';
import AppData from '../../models/appData.mjs';

function getPicture (request, response) {
  const appData = new AppData();

  // GET USER ID FROM REQUEST
  const userid = request.params.userid;

  // GET USER DATA WITH ID
  var user = new User(userid);

  // REQUEST NEXT SENTENCE
  const pictureNumber = user.getCurrentPictureNumber();
  const picture = appData.getPicture(pictureNumber);

  const photo = fs.readFileSync(appRoot + '/public/photos/' + picture.file);

  // RETURN SENTENCE IN RESPONSE
  response.status(200).append('hash', picture.hash).end(photo);
}

function getPicture2(request, response) {
  const appData = new AppData();

  // GET USER ID FROM REQUEST
  const userid = request.params.userid;

  // GET USER DATA WITH ID
  var user = new User(userid);

  // REQUEST NEXT SENTENCE
  const pictureNumber = user.getCurrentPictureNumber();
  const picture = appData.getPicture(pictureNumber);

  const photo = fs.readFileSync(appRoot + '/public/photos/' + picture.file);

  var payload = {
    hash: picture.hash,
    imageBase64: photo.toString('base64')
  };

  // RETURN SENTENCE IN RESPONSE
  response.writeHead(200, { 'Content-Type': 'application/json' });
  response.write(JSON.stringify(payload));
  response.end();
}

export { getPicture, getPicture2 };
