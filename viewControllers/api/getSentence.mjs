import log from '../../models/log.mjs';

const error = log('api').error;

export const getSentence = (request, response) => {

  response.status(200).append('hash', 0xDEADBEEF).end('This is a test sentence');

};
