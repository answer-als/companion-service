import log from '../../models/log.mjs';

const error = log('api').error;

export const putProfile = (request, response) => {

  response.status(200).end();

};
