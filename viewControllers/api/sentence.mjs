import fs from 'fs';
import crypto from 'crypto';
import log from '../../models/log.mjs';
import appRoot from 'app-root-path';
import User from '../../models/user.mjs';
import AppData from '../../models/appData.mjs';

const debug = log('api').debug;

function getSentence (request, response) {

  const sha1sum = crypto.createHash('sha1');
  const appData = new AppData();

  // GET USER ID FROM REQUEST
  const userid = request.params.userid;

  // GET USER DATA WITH ID
  var user = new User(userid);

  // REQUEST NEXT SENTENCE
  const sentenceNumber = user.getCurrentSentenceNumber();
  const sentence = appData.getSentence(sentenceNumber);

  // TODO PREDETERMINE THE HASH
  sha1sum.update(sentence.text);
  const hash = sha1sum.digest('hex');

  // RETURN SENTENCE IN RESPONSE
  response.status(200).append('hash', hash).end(sentence.text);

};

export { getSentence };
