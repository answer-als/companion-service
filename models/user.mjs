'use strict';

import fs from 'fs';
import moment from 'moment';
import appRoot from 'app-root-path';

export default class User {

    constructor(id, appData = null) {
      this.id = id;
      this.userFilePath = appRoot + '/data/users/' + this.id + '.json';
      this.userTemplatePath = appRoot + '/data/user-template.json';
      this.appData = appData;
      this.loadUserData();
    }

    // USER DATA
    loadUserData() {

      // TODO THIS SHOULD LOAD AND WRITE TO AZURE BLOB

      if (!fs.existsSync(this.userFilePath)) {
        this.createUserData();
      } else {
        const rawData = fs.readFileSync(this.userFilePath);
        this.data = JSON.parse(rawData);
      }

    }

    createUserData() {

      // TODO THIS SHOULD LOAD AND WRITE TO AZURE BLOB

      const rawTemplateData = fs.readFileSync(this.userTemplatePath);

      this.data = JSON.parse(rawTemplateData);

      this.data.id = this.id;
      this.created_at = moment();

      // INITIALIZE PICTURES
      this.data.pictures.sequence = this.appData.getRandomPictureSequence();
      // INITIALIZE SENTENCES
      this.data.sentences.sequence = this.appData.getRandomSentenceSequence();

      this.writeUserData();
    }

    writeUserData() {
      const data = JSON.stringify(this.data);
      fs.writeFileSync(this.userFilePath, data);
    }

    // PROFILE
    getProfile() {
      return this.data.profile;
    }

    updateProfile(profile) {
      this.data.profile.push(profile);
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
