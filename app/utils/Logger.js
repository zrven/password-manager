import Config from 'react-native-config';

const PROD = Config.IS_PRODUCTION === 'true' ? true : false;

class Logger {
  static logToken = (i) => {
    if (!PROD) {
      console.log(i);
    }
  };

  static logInfo = (i) => {
    if (PROD) {
      //console.log(i);
    } else {
      //console.log(i);
    }
  };

  static logError = async (e) => {
    if (PROD) {
      await console.recordError(e);
    } else {
      console.log(e);
    }
  };

  static crash = () => {
    console.log('crashed');
  };
}

export default Logger;
