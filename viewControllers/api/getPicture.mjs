import log from '../../models/log.mjs';

const error = log('api').error;

export const getPicture = (request, response) => {

  response.status(200).append('hash', 0xBAADF00D).end();

};
