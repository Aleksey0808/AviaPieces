import React, { useEffect } from 'react';
import { View, Text, ImageBackground, Image, StyleSheet, Animated, Easing } from 'react-native';
import { useFonts } from '../context/FontContext';

const PreviewScreen = ({ navigation }) => {
  const { fontsLoaded } = useFonts();
  const dotsOpacity = new Animated.Value(0);

  const startDotsAnimation = () => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(dotsOpacity, {
          toValue: 1,
          duration: 500,
          useNativeDriver: true,
        }),
        Animated.timing(dotsOpacity, {
          toValue: 0,
          duration: 500,
          useNativeDriver: true,
        }),
      ])
    ).start();
  };

  useEffect(() => {
    startDotsAnimation();

    const timer = setTimeout(() => {
      navigation.navigate('Welcome');
    }, 3000);

    return () => clearTimeout(timer); 
  }, []);

  return (
       <ImageBackground
        source={require('../../assets/images/bg/bgPreview.jpg')}
        style={styles.bgContainer}
      >
        <View style={styles.container}>
          <Text style={[styles.loadingText, { fontFamily: fontsLoaded ? 'Lilita-One' : 'System' }]}>
            Loading
          </Text>
          
          <Animated.Text style={[styles.dotsText, { opacity: dotsOpacity }]}>
            ...
          </Animated.Text>
        </View>
      </ImageBackground>
  );
};

const styles = StyleSheet.create({
  bgContainer: {
    flex: 1,
    resizeMode: 'cover',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    position: 'absolute',
    bottom: '10%',
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
  },
  dotsText: {
    position: 'absolute',
    bottom: '10%',
    left: '60%', 
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
  },
});

export default PreviewScreen;
