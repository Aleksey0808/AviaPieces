import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import PreviewScreen from '../screens/PreviewScreen';
import WelcomeScreen from '../screens/WelcomeScreen';
import HomeScreen from '../screens/HomeScreen';
import SelectPuzzleScreen from '../screens/SelectPuzzleScreen';
import GameScreen from '../screens/GameScreen';

const Stack = createStackNavigator();

const AppNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Preview" component={PreviewScreen} />
      <Stack.Screen name="Welcome" component={WelcomeScreen} />
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Select" component={SelectPuzzleScreen} />
      <Stack.Screen name="Game" component={GameScreen} />
    </Stack.Navigator>
  );
};

export default AppNavigator;