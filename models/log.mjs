import util from 'util';
import debugService from 'debug';

debugService.enable('error warning app unhandled home api');

export default (topic) => {

  let localDebug = debugService(topic);
  let localWarning = debugService('warning');
  let localError = debugService('error');

  let debug = (message) => {

    localDebug(topic + ': ' + util.inspect(message));

  };

  let warning = (message) => {

    localWarning(topic + ': ' + util.inspect(message));

  };

  let error = (message) => {

    localError(topic + ': ' + util.inspect(message));

    // sendToOperationsChannel(topic + ': ' + util.inspect(message));

  };

  return { debug: debug, warning: warning, error: error };

};
