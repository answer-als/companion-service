"usr strict"

import log from '../models/log.mjs';
import fs from 'fs';
import crypto from 'crypto';
import appRoot from 'app-root-path';

export default class Pictures {

    constructor() {
      this.loadData();
    }

    loadData() {
      const dataFilePath = appRoot + '/data/app-data.json';
      const rawData = fs.readFileSync(dataFilePath);
      const data = JSON.parse(rawData);
      this.data = data.pictures;
    }

    getPicture(index) {
      return this.data[index];
    }
}
