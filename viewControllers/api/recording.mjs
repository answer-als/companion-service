import log from '../../models/log.mjs';
import AppData from '../../models/appData.mjs';
import Storage from '../../models/storage.mjs';
import User from '../../models/user.mjs';

const error = log('api').error;

function getRecording (request, response) {

  const appData = new AppData();

  const queryHash = request.params.hash;

  const friendlyName = appData.getStoreName(queryHash);

  // TODO WHY IS THIS IN THE HEADER INSTEAD OF A PAYLOAD?
  response.append('Content-Type', 'application/x-counting-task');
  response.append('Friendly-Name', friendlyName);
  response.status(200).end();

}

function putRecording (request, response) {

  const buffer = request.body;
  const userid = request.params.userid;
  const hash = request.params.hash;

  const appData = new AppData();
  const storage = new Storage(appData);

  var user = new User(userid, appData);

  // RESPONSE CALL BACK
  let callback = function(err) {

    if (err) {
      error(err);
      response.status(500).end();
      return;
    }

    response.status(200).end();

  };

  // WRITE TO STORAGE
  storage.write(user, hash, buffer, callback);

}

export { getRecording, putRecording };
