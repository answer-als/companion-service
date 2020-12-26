import log from '../../models/log.mjs';
import storage from '../../models/storage.mjs';
import moment from 'moment';
import fs from 'fs';

const error = log('api').error;

export const putProfile = (request, response) => {

  const body = request.body;
  const userid = request.params.userid;

  if (checkUserDir(userid)) {
      createUserSequence(userid);
  };
    
  const filename = userid + '_profile_' + moment().format('YYYYMMDD-HHmmss-SSS') + '.json';
  
  storage.write(filename, Buffer.from(JSON.stringify(body), 'utf8'), (err) => {

    if (err) {
      error(err);
      response.status(500).end();
      return;
    }

    response.status(200).end();

  });

};

function checkUserDir(userid)
{
    var retval = false;

    const storageDir = '/data/companionservice/';
    const usersDir = storageDir + 'users/';

    // Create local filesystem storage directory
    if (!fs.existsSync(usersDir)) {
      fs.mkdirSync(usersDir);
    }

    const userDir = usersDir + userid;
    
    // Create local filesystem user directory
    if (!fs.existsSync(userDir)) {
      fs.mkdirSync(userDir);
    }
    
    if (fs.existsSync(userDir)) {
        retval = true;
    }

    return retval;
}

function createUserSequence(userid)
{
    var retval = false;
    
    const storageDir = '/data/companionservice/';
    const usersDir = storageDir + 'users/';
    const userDir = usersDir + userid;

    const sentenceIndexFile = userDir + '/sentence_index.txt';
    const imageIndexFile = userDir + '/image_index.txt';

    const sentenceSequenceFile = storageDir + userid + '_sentence_sequence.txt';
    const imageSequenceFile = storageDir + userid + '_image_sequence.txt';

    const maxSentences = 21;
    const maxImages = 19;

    var sequenceArray = [];
    var sequenceString = "";
    var i = 0;

    // Create local filesystem user directories
    if (!fs.existsSync(userDir)) {
      fs.mkdirSync(userDir);
        error("Created " + userDir);
    }

    if (fs.existsSync(userDir)) {
        if (!fs.existsSync(sentenceIndexFile)) {
            fs.writeFileSync(sentenceIndexFile, "0");
        }

        if (!fs.existsSync(imageIndexFile)) {
            fs.writeFileSync(imageIndexFile, "0");
        }

        if (!fs.existsSync(sentenceSequenceFile)) {
            sequenceArray = generateRandomSequence(maxSentences);
            
            sequenceString = "";
            
            for (i = 0; i < maxSentences; i++)
            {
                sequenceString += sequenceArray[i].toString();
                sequenceString += " ";
            }
            
            fs.writeFileSync(sentenceSequenceFile, sequenceString);
        }

        if (!fs.existsSync(imageSequenceFile)) {
            sequenceArray = generateRandomSequence(maxImages);
            
            sequenceString = "";
            
            for (i = 0; i < maxImages; i++)
            {
                sequenceString += sequenceArray[i].toString();
                sequenceString += " ";
            }
            
            fs.writeFileSync(imageSequenceFile, sequenceString);
        }

        retval = true;
    }
    

    return retval;
}

function generateRandomSequence(max)
{
    var retval = "";
    
    var array = [];
    
    // Initialize to unused value
    for (var i = 0; i < max; i++)
    {
      array[i] = -1;
    }

    var done = false;
    
    while ( done == false )
    {
        var arrayContainsValue = false;
        
        // Add random integer to first open slot
        var value = Math.floor(Math.random() * max);

        for (var j = 0; j < max; j++)
        {
          if (array[j] == value)
          {
              arrayContainsValue = true;
              break;
          }
        }
        
        if (arrayContainsValue == false)
        {
            for (var k = 0; k < max; k++)
            {
                if (array[k] == -1)
                {
                    array[k] = value;
                    break;
                }
            }
        }

        // Check that all slots are not the unused value
        var foundUnusedValue = false;
        
        for (var i = 0; i < max; i++)
        {
          if (array[i] == -1)
          {
              foundUnusedValue = true;
              break;
          }
        }
        
        // Loop exit criteria
        if (foundUnusedValue == false)
        {
            done = true;
        }

    }
    
    retval = array;
    
    return retval;
}
