# companion-service

Service for storing voice files

## Upload Voice API

### Get Sentence

GET https://answeralsdev.evergreencircuits.com/api/1/sentence/:userid

Response:
  headers.hash
  200 sentence string
  404

### Get Picture

GET https://answeralsdev.evergreencircuits.com/api/1/picture/:userid

Response:
  headers.hash
  200 picture byte stream
  404

### Put Recording

This api writes out the uploaded bytes to /data/companionservice/:userid-:hash-timestamp
In the future it will save the files to an Azure Blob Storage account

PUT https://answeralsdev.evergreencircuits.com/api/1/recording/:userid/:hash

Request Stream contains the m4a file data of the recording.
Note: limited to 1000 kb streams

Responses:
  200
  400 { errorcode: ###, error: '...' }

    curl -v -H 'Content-Type: application/octet-stream' -X PUT -T "public/photos/AALS_1.jpg" http://localhost:3000/api/v1/recording/user1/hash93

### Put User Profile

This api writes out the uploaded JSON to /data/companionservice/:userid.profile
In the future it will save the files to an Azure Blob Storage account

PUT https://answeralsdev.evergreencircuits.com/api/1/profile/:userid

Request: { ... }

    curl -v -H 'Content-Type: application/json' -X PUT -d '{"name": "John Jingleheimer Schmidtt" }' http://localhost:3000/api/v1/profile/user1
