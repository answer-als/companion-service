import fs from 'fs';
import crypto from 'crypto';
import appRoot from 'app-root-path';

export const getSentence = (request, response) => {

  const sha1sum = crypto.createHash('sha1');

  const sentences = fs.readFileSync(appRoot + '/public/sentences', 'utf8').split('\n');

  const index = Math.floor(Math.random() * (sentences.length));
  const sentence = sentences[index];

  sha1sum.update(sentence);
  const hash = sha1sum.digest('hex');

  response.status(200).append('hash', hash).end(sentence);

};
