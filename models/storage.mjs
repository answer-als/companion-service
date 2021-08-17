import assert from 'assert';
import log from './log.mjs';
import fs from 'fs';
import moment from 'moment';
import storage from 'azure-storage';
import { PassThrough } from 'stream';
import appRoot from 'app-root-path';
import crypto from 'crypto';

const account = process.env.AZURE_STORAGE_ACCOUNT_PROD || process.env.AZURE_STORAGE_ACCOUNT;
const key = process.env.AZURE_STORAGE_ACCESS_KEY_PROD || process.env.AZURE_STORAGE_ACCESS_KEY;

const storageDir = '/data/companionservice/';
const storageContainer = 'companionservice';

assert(account, 'AZURE_STORAGE_ACCOUNT environment variable must be set');
assert(key, 'AZURE_STORAGE_ACCESS_KEY environment variable must be set');

const error = log('api').error;

export default class Storage {

  constructor(appData) {
    this.appData = appData;
  }

  write(user, hash, buffer, callback) {

    // GET FILE DETAILS
    const assetDetails = this.appData.getAssetDetails(hash);
    const friendlyName = assetDetails.data.store_name;

    // ASSEMBLE FILE NAME
    const filename = user.id + '_' + friendlyName + '_' + moment().format('YYYYMMDD-HHmmss-SSS') + '.m4a';

    // BUILD USER CALLBACK
    let userCallback = function (writeSucceeded) {

      // INCREMENT USER INDEXES
      if (writeSucceeded) {

        if (assetDetail.type == "sentence") {
          user.incrementSentenceIndex();
        } else if (assetDetails.type == "picture") {
          user.incrementPictureIndex();
        }

      }

    }

    // BUILD WRITE CALL BACK
    let writeCallback = function (err, result) {

      // SUCCESS
      if (!err & !result) {
        userCallback(true);
        callback();
      }

      // ERROR ENCOUNTERED
      if (err) {
        userCallback(false);
        callback(err);
        return;
      }

      // NO RESULT
      if (!result) {
        userCallback(false);
        callback('Unable to write ' + filename);
        return;
      }

    };

    // WRITE FILE TO STORAGE
    const stream = new PassThrough();

    stream.end(buffer);

    if (!fs.existsSync(storageDir)) {
      fs.mkdirSync(storageDir);
    }

    fs.writeFileSync(storageDir + filename, buffer);

    // - CREATE BLOB SERVICE
    const blobs = storage.createBlobService(account, key);
    //blobs.logger.level = storage.Logger.LogLevels.DEBUG;

    // - CREATE CONTAINER IF NECESSARY
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

    // - WRITE FILE TO BLOB
    blobs.createBlockBlobFromStream(
      storageContainer,
      filename,
      stream,
      buffer.length,
      {},
      writeCallback
    );

  }

}

// const storageDir = '/data/companionservice/';
// const storageContainer = 'companionservice';

// Create local filesystem storage directory
// if (!fs.existsSync(storageDir)) {
//   fs.mkdirSync(storageDir);
// }

// const blobs = storage.createBlobService(account, key);
// //blobs.logger.level = storage.Logger.LogLevels.DEBUG;

// blobs.createContainerIfNotExists(
//   storageContainer,
//   (err, result) => {
//
//     if (err) {
//       error(err);
//     }
//
//     if (!result) {
//       error('Unable to create container ' + storageContainer);
//     }
//
//   }
// );

// const write = (filename, buffer, callback) => {
//
//   const stream = new PassThrough();
//   stream.end(buffer);
//
//   fs.writeFileSync(storageDir + filename, buffer);
//
//   blobs.createBlockBlobFromStream(
//     storageContainer,
//     filename,
//     stream,
//     buffer.length,
//     {},
//     (err, result) => {
//
//       if (err) {
//         callback(err);
//         return;
//       }
//
//       if (!result) {
//         callback('Unable to write ' + filename);
//         return;
//       }
//
//       callback();
//
//     }
//   );
//
// };

// export default {
//   write,
// };
