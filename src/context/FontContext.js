import React, { createContext, useContext, useEffect, useState } from 'react';
import * as Font from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { View, ActivityIndicator, StyleSheet } from 'react-native';
// import { useFonts } from 'expo-font';

const FontContext = createContext();

export const FontProvider = ({ children }) => {
  const [fontsLoaded, setFontsLoaded] = useState(false);

  useEffect(() => {
    const loadFonts = async () => {
      await Font.loadAsync({
        'Lilita-One': { uri: 'https://fonts.gstatic.com/s/lilitaone/v10/nKKT-GQ0F5dSY8vzG0rOEw2xW1Q.ttf' },
      });
      setFontsLoaded(true);
      await SplashScreen.hideAsync(); 
    };

    loadFonts();
  }, []);

  if (!fontsLoaded) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    ); 
  }

  return (
    <FontContext.Provider value={{ fontsLoaded }}>
      {children}
    </FontContext.Provider>
  );
};

export const useFonts = () => {
  return useContext(FontContext);
};

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
