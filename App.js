import React from 'react';

import Home from './src/screens/Home.js'
import Game from './src/screens/Game.js'
import Finish from './src/screens/Finish.js'

import { Provider } from 'react-redux'
import store from './src/store/index.js'

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper';

import { PersistGate } from 'redux-persist/integration/react';

const Stack = createStackNavigator()

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: 'tomato',
    accent: 'yellow',
  },
};

export default function App() {
  return (
    <Provider store={store}>
      <PaperProvider theme={theme}>
          <NavigationContainer>
            <Stack.Navigator initialRouteName="Home">
                <Stack.Screen name="Home" component={Home} />
                <Stack.Screen name="Sugokuy" component={Game} />
                <Stack.Screen name="Congrats" component={Finish} />
            </Stack.Navigator>
          </NavigationContainer>
      </PaperProvider>
    </Provider>
  );
}
