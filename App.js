/**
 * @format
 * @flow strict-local
 */
import 'react-native-gesture-handler';
import React, {useEffect} from 'react';

import AppContainer from './app/containers/AppContainer';

// UI Kitten
import * as eva from '@eva-design/eva';
import {EvaIconsPack} from '@ui-kitten/eva-icons';
import {ApplicationProvider, IconRegistry} from '@ui-kitten/components';
import {ApolloProvider} from '@apollo/react-hooks';
import {useApolloGraphClient} from './app/hooks';
import SplashScreen from 'react-native-splash-screen';
import Analytics from './app/utils/analytics';
import GlobalStore from './app/utils/globalStore';
import {ThemeContext} from './app/theme-context';
import {AppearanceProvider, useColorScheme} from 'react-native-appearance';

Analytics.init();

const App = () => {
  const client = useApolloGraphClient();
  const colorScheme = useColorScheme();
  const [theme, setTheme] = React.useState(colorScheme);

  const toggleTheme = () => {
    const nextTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(nextTheme);
  };

  useEffect(() => {
    SplashScreen.hide();
  }, []);

  useEffect(() => {
    setTheme(colorScheme);
  }, [colorScheme]);

  return (
    <>
      <IconRegistry icons={EvaIconsPack} />
      <AppearanceProvider>
        <ThemeContext.Provider value={{theme, toggleTheme}}>
          <ApplicationProvider {...eva} theme={{...eva[theme]}}>
            <ApolloProvider client={client}>
              <GlobalStore>
                <AppContainer />
              </GlobalStore>
            </ApolloProvider>
          </ApplicationProvider>
        </ThemeContext.Provider>
      </AppearanceProvider>
    </>
  );
};

export default App;
