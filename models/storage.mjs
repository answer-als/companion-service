import assert from 'assert';
import log from './log.mjs';
import fs from 'fs';
import storage from 'azure-storage';
import { PassThrough } from 'stream';

assert(process.env.AZURE_STORAGE_ACCOUNT, 'AZURE_STORAGE_ACCOUNT environment variable must be set');
assert(process.env.AZURE_STORAGE_ACCESS_KEY, 'AZURE_STORAGE_ACCESS_KEY environment variable must be set');

const error = log('api').error;

const storageDir = '/data/companionservice/';
const storageContainer = 'companionservice';

// Create local filesystem storage directory
if (!fs.existsSync(storageDir)) {
  fs.mkdirSync(storageDir);
}

const blobs = storage.createBlobService(process.env.AZURE_STORAGE_ACCOUNT, process.env.AZURE_STORAGE_ACCESS_KEY);
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

export default {
  write
};
