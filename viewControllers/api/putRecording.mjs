import log from '../../models/log.mjs';

const error = log('api').error;

export const putRecording = (request, response) => {

  response.status(200).end();

};