import assert from 'assert';
import util from 'util';
import debugService from 'debug';

debugService.enable('error warning app unhandled home api');

export default (topic) => {

  assert(topic, 'topic must be set');

  let localDebug = debugService(topic);
  let localWarning = debugService('warning');
  let localError = debugService('error');

  let debug = (message) => {

    assert(message, 'message must be set');

    localDebug(topic + ': ' + util.inspect(message));

  };

  let warning = (message) => {

    assert(message, 'message must be set');

    localWarning(topic + ': ' + util.inspect(message));

  };

  let error = (message) => {

    assert(message, 'message must be set');

    localError(topic + ': ' + util.inspect(message));

    // sendToOperationsChannel(topic + ': ' + util.inspect(message));

  };

  return { debug: debug, warning: warning, error: error };

};
