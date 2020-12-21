//import analytics, {firebase} from '@react-native-firebase/analytics';
import Config from 'react-native-config';

const enable = Config.IS_PRODUCTION === 'true' ? true : false;
class Analytics {
  static init() {
    //analytics().setAnalyticsCollectionEnabled(enable);
  }

  static onSignIn = (user) => {
    const {id} = user;
   // analytics().setUserId(id + '');
  //  analytics().setUserProperty('created_at', new Date() + '');
    this.logEvent('sign_in');
  };

  static onSignUp = (user) => {
    const {id} = user;
   // analytics().setUserId(id + '');
   // analytics().setUserProperty('created_at', new Date() + '');
    this.logEvent('sign_up');
  };

  static setCurrentScreen = (screenName) => {
    //analytics().setCurrentScreen(screenName, screenName);
   // analytics().logScreenView({
    //  screen_class: screenName,
   //   screen_name: screenName,
   // });
  };

  static logEvent = (eventName, body = {}) => {
   // analytics().logEvent(eventName, body);
  };

  static onSignOut = () => {
   // analytics().resetAnalyticsData();
  };
}

export default Analytics;
