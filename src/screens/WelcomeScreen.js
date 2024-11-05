import React from 'react';
import { StyleSheet, ImageBackground, View, Text, TouchableOpacity, Image } from 'react-native';
import { useFonts } from '../context/FontContext';

const WelcomeScreen = ({ navigation }) => {
  const { fontsLoaded } = useFonts();

  return (
    <ImageBackground
      source={require('../../assets/images/bg/bgHome.jpg')}
      style={styles.bgContainer}
    >
      <View style={styles.container}>
        <View style={{flex: 1, flexDirection: 'center', justifyContent: 'center'}}>
        <View style={styles.titleContainer}>
          <Text style={[styles.title, { fontFamily: fontsLoaded ? 'Lilita-One' : 'System' }]}>WELCOME</Text>
        </View>
        
        <View style={styles.instructionsContainer}>
          <Text style={[styles.instructionsText, { fontFamily: fontsLoaded ? 'Lilita-One' : 'System' }]}>
            How to Play{'\n\n'}
            1. Select a Puzzle Piece{'\n'}
                Choose a piece from the bottom of the screen.{'\n\n'}
            2. Find the Fit{'\n'}
                Available spaces will automatically highlight, showing where the piece can fit.{'\n\n'}
            3. Place the Piece{'\n'}
                Click on the piece to place it in the highlighted spot.
          </Text>

          <Text style={[styles.completeText, { fontFamily: fontsLoaded ? 'Lilita-One' : 'System' }]}>
            Complete the puzzle to build the full airplane!
          </Text>
        </View>
        </View>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate("Home")}>
          <Image source={require('../../assets/images/elements/button.png')} style={styles.imgBottom} />
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

export default WelcomeScreen;

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
  titleContainer: {
    paddingTop: 40,
    marginBottom: 30,
  },
  title: {
    textAlign: 'center',
    fontWeight: 'bold',
    color: '#fff',
    fontSize: 59,
    textShadowColor: '#1E1E1E',
    textShadowOffset: { width: 8, height: 8 },
    textShadowRadius: 9,
  },
  instructionsContainer: {
    width: 349,
    height: 428,
    backgroundColor: '#130007',
    borderRadius: 30,
    borderColor: '#8686864D',
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 40,
  },
  instructionsText: {
    color: '#fff',
    fontSize: 18,
    lineHeight: 20.57,
    textAlign: 'left',
    marginBottom: 20,
  },
  completeText: {
    color: '#fff',
    fontSize: 25,
    lineHeight: 28.58,
    textAlign: 'left',
  },
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 60,
    width: 360,
    marginTop: 'auto', 
    marginBottom: 60,
    paddingVertical: 15, 
    // paddingHorizontal: 40, 
    zIndex: 20,
  },
  imgBottom: {
    resizeMode: 'cover',
  },
});
