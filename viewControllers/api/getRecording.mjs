import storage from '../../models/storage';

export const getRecording = (request, response) => {

  const queryHash = request.params.hash;

  const friendlyName = storage.hashLookup(queryHash);

  response.append('Content-Type', 'application/x-counting-task');
  response.append('Friendly-Name', friendlyName);
  response.status(200).end();

};
