import fs from 'fs';
import crypto from 'crypto';
import appRoot from 'app-root-path';
import User from '../../models/user.mjs';
import AppData from '../../models/appData.mjs';

function getPicture (request, response) {

  const sha1sum = crypto.createHash('sha1');
  const appData = new AppData();

  // GET USER ID FROM REQUEST
  const userid = request.params.userid;

  // GET USER DATA WITH ID
  var user = new User(userid);

  // REQUEST NEXT SENTENCE
  const pictureNumber = user.getCurrentPictureNumber();
  const picture = appData.getPicture(pictureNumber);

  // TODO PREDETERMINE THE HASH
  sha1sum.update(picture.file);
  const hash = sha1sum.digest('hex');

  const photo = fs.readFileSync(appRoot + '/public/photos/' + picture.file);

  // RETURN SENTENCE IN RESPONSE
  response.status(200).append('hash', hash).end(photo);

}

export { getPicture };
