import User from '../../models/user.mjs';
import AppData from '../../models/appData.mjs';

function getSentence (request, response) {

  const appData = new AppData();

  // GET USER ID FROM REQUEST
  const userid = request.params.userid;

  // GET USER DATA WITH ID
  var user = new User(userid);

  // REQUEST NEXT SENTENCE
  const sentenceNumber = user.getCurrentSentenceNumber();
  const sentence = appData.getSentence(sentenceNumber);

  // RETURN SENTENCE IN RESPONSE
  response.status(200).append('hash', sentence.hash).end(sentence.text);
}

function getSentence2 (request, response) {

  const appData = new AppData();

  // GET USER ID FROM REQUEST
  const userid = request.params.userid;

  // GET USER DATA WITH ID
  var user = new User(userid, appData);

  user.loadUserData(function(err, user){
    if(err){
      response.status(500).end('Error loading user data.');
    }else{
      // REQUEST NEXT SENTENCE
      const sentenceNumber = user.getCurrentSentenceNumber();
      const sentence = appData.getSentence(sentenceNumber);

      var payload = {
        hash: sentence.hash,
        sentenceText: sentence.text
      };

      // RETURN SENTENCE IN RESPONSE
      response.writeHead(200, { 'Content-Type': 'application/json' });
      response.write(JSON.stringify(payload));
      response.end();
    }
  });
}

export { getSentence, getSentence2};
