import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';

import Home from './src/screens/Home.js'
import Game from './src/screens/Game.js'
import Finish from './src/screens/Finish.js'

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator()
export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen name="Sugokuy" component={Game} />
          <Stack.Screen name="Congrats" component={Finish} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
