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

}
