'usr strict';

import fs from 'fs';
import appRoot from 'app-root-path';

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
