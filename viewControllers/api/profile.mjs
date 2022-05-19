import User from '../../models/user.mjs';
import AppData from '../../models/appData.mjs';
import moment from 'moment';

function getProfile (request, response) {

  // FOR NOW, THIS END-POINT IS JUST FOR TESTING
  response.status(500).end();

  // GET PROFILE
  // const userid = request.params.userid;
  //
  // var user = new User(userid);
  //
  // response.status(200).end(user.getProfile());

}

function putProfile (request, response) {

  const profile = request.body;
  const userid = request.params.userid;
  const appData = new AppData();

  var user = new User(userid, appData);

  profile.date = moment().format('YYYYMMDD-HHmmss');

  user.updateProfile(profile);
  user.writeUserData();

  response.status(200).end('ok');

}

function putProfile2 (request, response) {

  const questionnaireResult = request.body;
  const userid = request.params.userid;
  const appData = new AppData();

  var user = new User(userid, appData);

  user.loadUserData(function(err, user){
    if(err){
      response.status(500).end('Error loading user data.');
    }else{
      let profile = JSON.parse(questionnaireResult.profileData);
      profile.date = questionnaireResult.timestamp;

      user.updateProfile(profile);
      user.writeUserData(function(){
        response.status(200).end('ok');
      });
    }
  });
}

export { getProfile, putProfile, putProfile2 };
