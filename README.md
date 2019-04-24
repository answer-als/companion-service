# companion-service

Service for storing voice files 

## Upload Voice API

### Get Sentence

GET https://answeralsdev.evergreencircuits.com/api/1/sentence/:userid

Response:
  headers.hash
  200 'This is a sentence'
  404

### Get Picture

GET https://answeralsdev.evergreencircuits.com/api/1/picture/:userid

Response:
  headers.hash
  200 Photo byte stream
  404

### Put Recording

PUT https://answeralsdev.evergreencircuits.com/api/1/recording/:userid/:hash

Request Stream contains the m4a file data of the recording

Responses:
  200
  400 { errorcode: ###, error: '...' }

### Put User Profile

PUT https://answeralsdev.evergreencircuits.com/api/1/profile/:userid

Request: { ... }
