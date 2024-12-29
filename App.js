import React, { useEffect, useState } from 'react';
import { View, Modal, Image, TouchableOpacity, Text, StyleSheet, } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import AppNavigator from './src/navigations/AppNavigator';
import { FontProvider } from './src/context/FontContext';

export default function App() {
    return (
      <FontProvider>
        <NavigationContainer>
          <AppNavigator />
        </NavigationContainer>
      </FontProvider>
    );
  }