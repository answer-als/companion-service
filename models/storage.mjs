import log from './log.mjs';
import fs from 'fs';
import moment from 'moment';
import storage from 'azure-storage';
import { PassThrough } from 'stream';

const error = log('api').error;

// JUST TO PLEASE THE LINTER FOR NOW
const AZURE_STORAGE_ACCOUNT = process.env.AZURE_STORAGE_ACCOUNT;
const AZURE_STORAGE_ACCESS_KEY = process.env.AZURE_STORAGE_ACCESS_KEY;
const STORAGE_DIR = process.env.STORAGE_DIR || '/data/companionservice/';
const STORAGE_AZURE_BLOB_CONTAINER = process.env.STORAGE_AZURE_BLOB_CONTAINER || 'companionservice';
const localHost = 'http://127.0.0.1:10000/devstoreaccount1';

export default class Storage {

  constructor(appData) {
    this.appData = appData;
  }

  write(user, hash, buffer, callback) {

    // GET FILE DETAILS
    const assetDetails = this.appData.getAssetDetails(hash);
    const friendlyName = assetDetails.data.store_name;

    // ASSEMBLE FILE NAME
    const filename = user.id + '_' + friendlyName + '_' + moment().format('YYYYMMDD-HHmmss') + '.m4a';

    // BUILD USER CALLBACK
    let userCallback = function (writeSucceeded) {

      // INCREMENT USER INDEXES
      if (writeSucceeded) {

        if (assetDetails.type == 'sentence') {
          user.incrementSentenceIndex();
        } else if (assetDetails.type == 'picture') {
          user.incrementPictureIndex();
        }

      }

    };

    // BUILD WRITE CALL BACK
    let writeCallback = function (err, result) {

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

      userCallback(true);
      callback();
      return;

    };

    // WRITE FILE TO STORAGE
    const stream = new PassThrough();

    stream.end(buffer);

    // !!!! WHAT DOES THIS DO? >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
    if (!fs.existsSync(STORAGE_DIR)) {
      fs.mkdirSync(STORAGE_DIR);
    }

    fs.writeFileSync(STORAGE_DIR + filename, buffer);
    // <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<

    // - CREATE BLOB SERVICE
    const blobs = storage.createBlobService(AZURE_STORAGE_ACCOUNT, AZURE_STORAGE_ACCESS_KEY, localHost);
    //blobs.logger.level = storage.Logger.LogLevels.DEBUG;

    // - CREATE CONTAINER IF NECESSARY
    blobs.createContainerIfNotExists(
      STORAGE_AZURE_BLOB_CONTAINER,
      (err, result) => {

        if (err) {
          error(err);
        }

        if (!result) {
          error('Unable to create container ' + STORAGE_AZURE_BLOB_CONTAINER);
        }

      }
    );

    // - WRITE FILE TO BLOB
    blobs.createBlockBlobFromStream(
      STORAGE_AZURE_BLOB_CONTAINER,
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
