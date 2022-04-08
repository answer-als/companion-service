'use strict';

import fs from 'fs';
import appRoot from 'app-root-path';

export default class AppData {

    constructor() {
      this.appDataPath = appRoot + '/data/app-data.json';
      this.loadData();
    }

    loadData() {
      const rawData = fs.readFileSync(this.appDataPath);
      this.data = JSON.parse(rawData);
    }

    // ASSETS
    getAssetDetails(testHash) {

      var details = {
        data:{}
      };

      // TASKS
      if (testHash == 'CountingTask') {
        details.type = 'counting-task';
        details.data.store_name = 'counting-task';
      }

      if (testHash == 'AhTask') {
        details.type = 'ah-task';
        details.data.store_name = 'ah-task';
      }

      if (testHash == 'Pass') {
        details.type = 'pass-task';
        details.data.store_name = 'pass-task';
      }

      // SENTENCES
      for (let i = 0; i < this.data.sentences.sentence_numbers.length; i++) {

        let sentenceData = this.data.sentences[i];

        if (testHash == sentenceData.hash) {
          details.type = 'sentence';
          details.data = sentenceData;
        }

      }

      // PICTURES
      for (let j = 0; j < this.data.pictures.picture_numbers.length; j++) {

        let pictureData = this.data.pictures[j];

        if (testHash == pictureData.hash) {
          details.type = 'picture';
          details.data = pictureData;
        }

      }

      return details;

    }

    getStoreName(testHash) {

      var assetDetails = this.getAssetDetails(testHash);

      return assetDetails.data.store_name;

    }

    // SENTENCES
    getSentence(number) {
      return this.data.sentences[number];
    }

    // PICTURES
    getPicture(number) {
      return this.data.pictures[number];
    }

    // SEQUENCES
    getRandomPictureSequence() {
      return this.shuffle(this.data.pictures.picture_numbers);
    }

    getRandomSentenceSequence() {
      return this.shuffle(this.data.sentences.sentence_numbers);
    }

    shuffle(data) {

      // https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
      var currentIndex = data.length,  randomIndex;

      // While there remain elements to shuffle...
      while (0 !== currentIndex) {

        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;

        // And swap it with the current element.
        [data[currentIndex], data[randomIndex]] = [
          data[randomIndex], data[currentIndex]];
      }

      return data;
    }

}
