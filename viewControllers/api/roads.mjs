import User from '../../models/user.mjs';
import AppData from '../../models/appData.mjs';

function putRoads (request, response) {

  const questionnaireResult = request.body;
  const appData = new AppData();

  var user = new User(questionnaireResult.userId, appData);

  user.loadUserData(function(err, user){
    if(err){
      response.status(500).end('Error saving ROADS results.');
    }else{
      let profile = JSON.parse(questionnaireResult.profileData);
      profile.date = questionnaireResult.timestamp;

      user.updateRoads(profile);
      user.writeUserData(function(){
        response.status(200).end('ok');
      });
    }
  });
}

export {putRoads};