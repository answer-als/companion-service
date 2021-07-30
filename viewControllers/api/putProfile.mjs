import log from '../../models/log.mjs';
import storage from '../../models/storage.mjs';
import User from '../../models/user.mjs';
import AppData from '../../models/appData.mjs';
import moment from 'moment';
import fs from 'fs';

const error = log('api').error;

export const putProfile = (request, response) => {

  const body = request.body;
  const userid = request.params.userid;
  const appData = new AppData();

  var user = new User(userid, appData);

  const profile = JSON.stringify(body);

  user.updateProfile(profile);
  user.writeUserData();

  response.status(200).end('ok');

};
