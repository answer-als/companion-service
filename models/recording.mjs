"use strict"

import fs from 'fs';
import moment from 'moment';
import appRoot from 'app-root-path';
import crypto from 'crypto';
import log from '../models/log.mjs';

export default class Recording {


    constructor(userId, appData) {
      this.userId = userId;
      this.appData = appData;
    }

    getFilename(hash) {
      const storeName = this.getStoreName(hash);
      const timestamp = moment().format('YYYYMMDD-HHmmss-SSS');

      const filename = this.userId + '_' + storeName + '_' + timestamp + '.m4a';

      return filename;
    }

    getStoreName(testHash) {

      // TASKS
      if (testHash == 'CountingTask') {
        return 'counting-task';
      }

      if (testHash == 'AhTask') {
        return 'ah-task';
      }

      // SENTENCES
      for (let i = 0; i < this.appData.data.sentences.sentence_numbers.length; i++) {

        let sentenceData = this.appData.data.sentences[i];

        if (testHash == sentenceData.hash) {
          return sentenceData.store_name
        }

      }

      // PICTURES
      for (let j = 0; j < this.appData.data.pictures.picture_numbers.length; j++) {

        let pictureData = this.appData.data.pictures[j]

        if (testHash == pictureData.hash) {
          return pictureData.store_name;
        }

      }

      return 'no-match';

    }

}
