"use strict"

import log from '../models/log.mjs';
import fs from 'fs';
import moment from 'moment';
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

    getSentence(number) {
      return this.data.sentences[number];
    }

    getPicture(number) {
      return this.data.pictures[number];
    }

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
