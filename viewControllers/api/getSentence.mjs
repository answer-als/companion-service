import log from '../../models/log.mjs';
import fs from 'fs';
import crypto from 'crypto';
import appRoot from 'app-root-path';

const debug = log('api').debug;

export const getSentence = (request, response) => {

  const sha1sum = crypto.createHash('sha1');

  const sentences = fs.readFileSync(appRoot + '/public/sentences', 'utf8').split('\n');

  //const index = Math.floor(Math.random() * (sentences.length));
    
  // Get userid from request
  const userid = request.params.userid;

  var index = -1;
    
  if (checkUserDir(userid)) {
    index = getSequenceValue(userid);
  };
    
  if (index == -1)
  {
    index = Math.floor(Math.random() * (sentences.length));
  }

  const sentence = sentences[index];

  sha1sum.update(sentence);
  const hash = sha1sum.digest('hex');

  response.status(200).append('hash', hash).end(sentence);

};

function checkUserDir(userid)
{
    var retval = false;
    
    const storageDir = '/data/companionservice/';
    const usersDir = storageDir + 'users/';
    const userDir = usersDir + userid;

    if (fs.existsSync(userDir)) {
        retval = true;
    }

    return retval;
}

function getSequenceValue(userid)
{
    var retval = -1;
    
    const storageDir = '/data/companionservice/';
    const usersDir = storageDir + 'users/';
    const userDir = usersDir + userid;

    const indexFile = userDir + '/sentence_index.txt';
    const sequenceFile = storageDir + userid + '_sentence_sequence.txt';

    const maxSentences = 21;

    if (fs.existsSync(indexFile) && fs.existsSync(sequenceFile))
    {
        // Open index file
        // Read index string
        var indexString = fs.readFileSync(indexFile);
        
        // Convert to int
        var i = parseInt(indexString);
        var index = i;
        
        // Increment index value
        i += 1;
        
        if (i >= maxSentences)
        {
            i = 0;
        }
        
        // Write index value
        fs.writeFileSync(indexFile, i.toString());

        // Open sequence file
        // Read sequence string
        var sequenceString = fs.readFileSync(sequenceFile, 'utf8');
        
//        debug('Sentence sequence = ' + sequenceString);
        
        // Parse string as space-separated values
        var sequenceArray = sequenceString.split(' ');

        // Get value at index
        retval = parseInt(sequenceArray[index]);
        
//        debug('Returning sentence at ' + index.toString() + ' = ' + sequenceArray[index]);
//        debug('retval = ' + retval.toString());
    }

    return retval;
}


