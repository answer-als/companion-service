'use strict';

import log from './log.mjs';
import fs from 'fs';
import moment from 'moment';
import appRoot from 'app-root-path';
import AppData from './appData.mjs';
import Storage from './storage.mjs';


const error = log('api').error;

export default class User {

    constructor(id) {
      this.id = id;
      this.userFilePath = appRoot + '/data/users/' + this.id + '.json';
      this.userTemplatePath = appRoot + '/data/user-template.json';
      this.appData = new AppData();
      this.storage = new Storage(this.appData);
    }

    // USER DATA
    loadUserData(callback) {
      let self = this;

      let getData = function(err,userData){
        if(err){
          error('Error loading user data: ' + err);
          callback(err);
        }else{
          self.data = userData;
          callback(null, self);
        }
      };

      this.storage.doesUserDataExist(self.id, function(err, doesExist){

        if(err){
          callback(err);
          return;
        }

        if(doesExist){
          self.storage.getUserData(self.id, function(err, blobContent){
            if(err){
              callback(err);
              return;
            }

            let data = JSON.parse(blobContent);
            getData(null, data);
          });
        }else{
          this.createUserData(getData);
        }
      });
    }

    createUserData(getData) {
      const rawTemplateData = fs.readFileSync(this.userTemplatePath);

      let data = JSON.parse(rawTemplateData);

      this.data.id = this.id;
      this.created_at = moment();

      // INITIALIZE PICTURES
      this.data.pictures.sequence = this.appData.getRandomPictureSequence();

      // INITIALIZE SENTENCES
      this.data.sentences.sequence = this.appData.getRandomSentenceSequence();

      getData(null, data);
    }

    writeUserData() {
      let self = this;

      this.storage.saveUserData(self.data, function(err){

        //If there's an error with azure storage account, save locally.
        if(err){
          error('Error saving to Azure Storage: ' + err);

          const data = JSON.stringify(self.data);
          fs.writeFileSync(self.userFilePath, data);
        }
      });
    }

    // PROFILE
    getProfile() {
      return this.data.profile;
    }

    updateProfile(profile) {
      this.data.profile.push(profile);
    }

    updateRoads(roadsResult){
      if(!this.data.roads){
        this.data.roads = [];
      }

      this.data.roads.push(roadsResult);
    }

    // PICTURES
    getCurrentPictureNumber() {
      return this.data.pictures.sequence[this.data.pictures.current_index];
    }

    incrementPictureIndex() {

      const currIndex = this.data.pictures.current_index;
      const pictureSize = this.data.pictures.sequence.length;
      var newIndex = currIndex;

      if (newIndex + 1 >= pictureSize) {
        newIndex = 0; // RESTART FROM THE BEGINNING
      } else {
        newIndex++; // MOVE TO THE NEXT SENTENCE
      }

      this.data.pictures.current_index = newIndex;

      this.writeUserData();
    }

    // SENTENCES
    getCurrentSentenceNumber() {
      return this.data.sentences.sequence[this.data.sentences.current_index];
    }

    incrementSentenceIndex() {

      const currIndex = this.data.sentences.current_index;
      const sentenceSize = this.data.sentences.sequence.length;
      var newIndex = currIndex;

      if (newIndex + 1 >= sentenceSize) {
        newIndex = 0; // RESTART FROM THE BEGINNING
      } else {
        newIndex++; // MOVE TO THE NEXT SENTENCE
      }

      this.data.sentences.current_index = newIndex;

      this.writeUserData();
    }
}
