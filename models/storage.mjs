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

export default class Storage {

  constructor(appData) {
    this.appData = appData;
  }

  saveRecording(user, hash, buffer, callback) {

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

    // - CREATE BLOB SERVICE

    var blobs = this.getBlobService();

    // - WRITE FILE TO BLOB
    blobs.createBlockBlobFromStream(
      STORAGE_AZURE_BLOB_CONTAINER,
      filename,
      stream,
      buffer.length,
      {},
      function(error, result){
        if(error){
          error('Error saving to Azure Storage: ' + error);
          fs.writeFileSync(STORAGE_DIR + filename, buffer);
          //TODO: Probably shouldn't return an error...
          writeCallback(error);
          return;
        }

        writeCallback(null, result);
        return;
      }
    );

  }

  doesUserDataExist(userId,callback){
    var blobService = this.getBlobService();

    blobService.getBlobProperties(
      STORAGE_AZURE_BLOB_CONTAINER,
      userId,
      function(err, properties, response) {

        if(err){
          callback(err);
          return;
        }

        if(response){
          callback(null, response.isSuccessful);
          return;
        }

        callback('Azure Storage Response not available.');
      });
  }

  getUserData(userId, callback){
    var blobService = this.getBlobService();

    blobService.getBlobToText(
      STORAGE_AZURE_BLOB_CONTAINER,
      userId,
      function(err, blobContent) {
        callback(err, blobContent);
      });
  }

  saveUserData(userData, callback){
    var blobService = this.getBlobService();

    blobService.createBlockBlobFromText(
      STORAGE_AZURE_BLOB_CONTAINER,
      userData.id,
      JSON.stringify(userData),
      function(error, result){
        callback(error, result);
    });
  }

  getBlobService(){

    var blobs = storage.createBlobService(AZURE_STORAGE_ACCOUNT, AZURE_STORAGE_ACCESS_KEY);

      if(process.env.NODE_ENV === 'DEBUG'){
        const localHost = 'http://127.0.0.1:10000/devstoreaccount1';
        blobs = storage.createBlobService(AZURE_STORAGE_ACCOUNT, AZURE_STORAGE_ACCESS_KEY, localHost);
        blobs.logger.level = storage.Logger.LogLevels.DEBUG;
      }

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

      return blobs;
  }
}
