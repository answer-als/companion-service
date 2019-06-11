import fs from 'fs';
import crypto from 'crypto';
import appRoot from 'app-root-path';

const sentenceHit = (queryHash) => {

  const sentences = fs.readFileSync(appRoot + '/public/sentences', 'utf8').split('\n');
  sentences.forEach( (sentence, index) => {

    const sha1sum = crypto.createHash('sha1');
    sha1sum.update(sentence);
    const hash = sha1sum.digest('hex');

    if (hash == queryHash) {

      cache[hash] = {
        contentType: 'text/plain',
        friendlyName: 'sentence-' + index
      };

      return true;

    }

  });

  return false;

};

const pictureHit = (queryHash) => {

  const photoNames = fs.readdirSync(appRoot + '/public/photos');

  photoNames.forEach( (photoName) => {

    const photo = fs.readFileSync(appRoot + '/public/photos/' + photoName);

    const sha1sum = crypto.createHash('sha1');
    sha1sum.update(photo);
    const hash = sha1sum.digest('hex');

    if (hash == queryHash) {

      response.append('Content-Type', 'image/jpeg');
      response.append('Friendly-Name', photoName);
      response.status(200).end();

      return true;

    }

  });

  return false;

};

export const getRecording = (request, response) => {

  const queryHash = request.params.hash;

  // Is this a counting task?  Find simplest first

  if (queryHash == 'CountingTask') {

    response.append('Content-Type', 'application/x-counting-task');
    response.append('Friendly-Name', 'counting-task');
    response.status(200).end();
    return;
  }

  // Check for a sentence match

  const sentences = fs.readFileSync(appRoot + '/public/sentences', 'utf8').split('\n');
  sentences.forEach( (sentence, index) => {

    const sha1sum = crypto.createHash('sha1');
    sha1sum.update(sentence);
    const hash = sha1sum.digest('hex');

    if (hash == queryHash) {

      response.append('Content-Type', 'text/plain');
      response.append('Friendly-Name', 'sentence-' + index);
      response.status(200).send(sentence);
      return;

    }

  });

  // Check for a photo match

  const photoNames = fs.readdirSync(appRoot + '/public/photos');

  photoNames.forEach( (photoName) => {

    const photo = fs.readFileSync(appRoot + '/public/photos/' + photoName);

    const sha1sum = crypto.createHash('sha1');
    sha1sum.update(photo);
    const hash = sha1sum.digest('hex');

    if (hash == queryHash) {

      response.append('Content-Type', 'image/jpeg');
      response.append('Friendly-Name', photoName);
      response.status(200).send(photo);
      return;

    }

  });

};
