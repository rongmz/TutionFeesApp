import 'react-native-gesture-handler';
import React from 'react';
import { AppRegistry } from 'react-native';
import App from './src/App';
import { name as appName } from './app.json';
import { Provider as PaperProvider, DefaultTheme } from 'react-native-paper';
import appColors from './src/appColors';


const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: appColors.primary,
    accent: appColors.accent,
    // text: appColors.textOnPrimary,
  },
};

AppRegistry.registerComponent(appName, () => () => (
  <PaperProvider theme={theme}>
    <App />
  </PaperProvider>
));
