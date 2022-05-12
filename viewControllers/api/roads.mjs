import User from '../../models/user.mjs';
import AppData from '../../models/appData.mjs';

function putRoads (request, response) {

  const questionnaireResult = request.body;
  const appData = new AppData();

  var user = new User(questionnaireResult.userid, appData);

  let profile = JSON.parse(questionnaireResult.profileData);
  profile.date = questionnaireResult.timestamp;

  user.updateProfile(profile);
  user.writeUserData();

  response.status(200).end('ok');

}
 export {putRoads};
