"usr strict"

import fs from 'fs';
import crypto from 'crypto';
import appRoot from 'app-root-path';
import log from '../models/log.mjs';

export default class Sentences {

    constructor() {
      this.loadData();
    }

    loadData() {
      const dataFilePath = appRoot + '/data/app-data.json';
      const rawData = fs.readFileSync(dataFilePath);
      const data = JSON.parse(rawData);
      this.data = data.sentences;
    }

    getSentence(index) {
      return this.data[index];
    }
}
