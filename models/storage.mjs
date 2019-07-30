import assert from 'assert';
import log from './log.mjs';
import fs from 'fs';
import storage from 'azure-storage';
import { PassThrough } from 'stream';
import appRoot from 'app-root-path';
import crypto from 'crypto';

const account = process.env.AZURE_STORAGE_ACCOUNT_PROD || process.env.AZURE_STORAGE_ACCOUNT;
const key = process.env.AZURE_STORAGE_ACCESS_KEY_PROD || process.env.AZURE_STORAGE_ACCESS_KEY;

assert(account, 'AZURE_STORAGE_ACCOUNT environment variable must be set');
assert(key, 'AZURE_STORAGE_ACCESS_KEY environment variable must be set');

const error = log('api').error;

const storageDir = '/data/companionservice/';
const storageContainer = 'companionservice';

// Create local filesystem storage directory
if (!fs.existsSync(storageDir)) {
  fs.mkdirSync(storageDir);
}

const blobs = storage.createBlobService(account, key);
//blobs.logger.level = storage.Logger.LogLevels.DEBUG;

blobs.createContainerIfNotExists(
  storageContainer,
  (err, result) => {

    if (err) {
      error(err);
    }

    if (!result) {
      error('Unable to create container ' + storageContainer);
    }

  }
);

const write = (filename, buffer, callback) => {

  const stream = new PassThrough();
  stream.end(buffer);

  fs.writeFileSync(storageDir + filename, buffer);

  blobs.createBlockBlobFromStream(
    storageContainer,
    filename,
    stream,
    buffer.length,
    {},
    (err, result) => {

      if (err) {
        callback(err);
        return;
      }

      if (!result) {
        callback('Unable to write ' + filename);
        return;
      }

      callback();

    }
  );

};

const hashLookup = (queryHash) => {

  // Is this a counting task?  Find simplest first

  if (queryHash == 'CountingTask') {

    return 'counting-task';
  }

  // Check for a sentence match

  const sentences = fs.readFileSync(appRoot + '/public/sentences', 'utf8').split('\n');
  var index = 0;
  for (let sentence of sentences) {

    const sha1sum = crypto.createHash('sha1');
    sha1sum.update(sentence);
    const hash = sha1sum.digest('hex');

    if (hash == queryHash) {

      return 'sentence-' + index;

    }

    index++;

  }

  // Check for a photo match

  const photoNames = fs.readdirSync(appRoot + '/public/photos');

  for (let photoName of photoNames) {

    const photo = fs.readFileSync(appRoot + '/public/photos/' + photoName);

    const sha1sum = crypto.createHash('sha1');
    sha1sum.update(photo);
    const hash = sha1sum.digest('hex');

    if (hash == queryHash) {

      return photoName;

    }

  }

  return 'notfound-' + queryHash;

};

export default {
  write,
  hashLookup
};
