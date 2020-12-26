import log from '../../models/log.mjs';
import fs from 'fs';
import crypto from 'crypto';
import appRoot from 'app-root-path';

const debug = log('api').debug;

export const getPicture = (request, response) => {

  const sha1sum = crypto.createHash('sha1');

    /*
     Changed this sequence to approximate the sentence retrieval,
     which is more reliable.
     Also, the macOS .DS_Store file got uploaded and I haven't
     figured out how to remove it. So that throws off the
     file count.
     */
  const photos = fs.readdirSync(appRoot + '/public/photos');
  //const index = Math.floor(Math.random() * (photos.length));
    
//  debug('appRoot = ' + appRoot);
//  debug('photos = ' + photos);

  // Get userid from request
  const userid = request.params.userid;

  var index = -1;
    
  if (checkUserDir(userid)) {
    index = getSequenceValue(userid);
  };
    
  if (index == -1)
  {
    index = Math.floor(Math.random() * (photos.length));
  }

  const photo_list = fs.readFileSync(appRoot + '/public/photo_list', 'utf8').split('\n');
/*
    for ( var i = 0; i < photo_list.length; i++ )
    {
        debug('photo_list[ ' + i.toString() + ' ] = ' + photo_list[i]);
    }

    debug('Retrieving photo ' + photo_list[index]);
 */
  const photo = fs.readFileSync(appRoot + '/public/photos/' + photo_list[index]);

  sha1sum.update(photo);
  const hash = sha1sum.digest('hex');

  response.status(200).append('hash', hash).end(photo);

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

    const indexFile = userDir + '/image_index.txt';
    const sequenceFile = storageDir + userid + '_image_sequence.txt';

    const maxImages = 19;

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
        
        if (i >= maxImages)
        {
            i = 0;
        }
        
        // Write index value
        fs.writeFileSync(indexFile, i.toString());

        // Open sequence file
        // Read sequence string
        var sequenceString = fs.readFileSync(sequenceFile, 'utf8');
        
        //debug('sequenceString = ' + sequenceString);

        // Parse string as space-separated values
        var sequenceArray = sequenceString.split(' ');

        // Get value at index
        retval = parseInt(sequenceArray[index]);
        
        //debug('int at ' + index.toString() + ' = ' + sequenceArray[index]);
        //debug('retval = ' + retval.toString());
    }

    return retval;
}


