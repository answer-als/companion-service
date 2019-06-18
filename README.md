# companion-service

Service for storing voice files

### Get Sentence

GET https://answeralsdev.evergreencircuits.com/api/1/sentence/:userid

Response:
  headers.hash
  200 sentence string
  404

### Get Picture

GET https://answeralsdev.evergreencircuits.com/api/v1/picture/:userid

Response:
  headers.hash
  200 picture byte stream
  404

### Put Recording

This api writes out the uploaded bytes to /data/companionservice/:userid-:hash-timestamp
In the future it will save the files to an Azure Blob Storage account

PUT https://answeralsdev.evergreencircuits.com/api/v1/recording/:userid/:hash

Request Stream contains the m4a file data of the recording.
Note: limited to 1000 kb streams

Responses:
  200
  400 { errorcode: ###, error: '...' }

    curl -v -H 'Content-Type: application/octet-stream' -X PUT -T "public/photos/AALS_1.jpg" http://localhost:3000/api/v1/recording/user1/hash93

### Put User Profile

This api writes out the uploaded JSON to /data/companionservice/:userid.profile
In the future it will save the files to an Azure Blob Storage account

PUT https://answeralsdev.evergreencircuits.com/api/v1/profile/:userid

Request: { ... }

    curl -v -H 'Content-Type: application/json' -X PUT -d '{"name": "John Jingleheimer Schmidtt" }' http://localhost:3000/api/v1/profile/user1

### Get Content &amp; Metadata for an upload

GET https://answeralsdev.evergreencircuits.com/api/v1/recording/:hash

Response Stream contains the data used to prompt the Recording (e.g. sentence text or picture image)
Response Header contains the content-type of the recording, or application/x-counting for a counting task

### Get Metadata for an upload

HEAD https://answeralsdev.evergreencircuits.com/api/v1/recording/:hash

Response Header contains the content-type of the recording, or application/x-counting-task for a counting task as well
as the friendly name of the content.

    curl -I http://answeralsdev.evergreencircuits.com/api/v1/recording/31d9324b07f3a2c61007b30599c9557f17630f8b

    HTTP/1.1 200 OK
    X-Powered-By: Express
    Access-Control-Allow-Origin: *
    Content-Type: image/jpeg
    Friendly-Name: picture_scouts.jpg
    Content-Length: 150623
    ETag: W/"24c5f-MdkySwfzosYQB7MFmclVfxdjD4s"
    Date: Tue, 11 Jun 2019 13:58:16 GMT
    Connection: keep-alive
