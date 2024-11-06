import React from 'react';
import { StyleSheet, ImageBackground, View, Text, TouchableOpacity, Image, Linking } from 'react-native';
import { useFonts } from '../context/FontContext';
import { puzzleLevels } from '../helpers/puzzleLevels'

const HomeScreen = ({ navigation }) => {
  const { fontsLoaded } = useFonts();

  const handleLevel = (level) => {
    selectLevel = puzzleLevels.filter(item => item.level === level)
    // console.log(selectLevel)
    navigation.navigate("Select", {selectLevel})
  }

  return (
    <ImageBackground
      source={require('../../assets/images/bg/bgGame.jpg')}
      style={styles.bgContainer}
    >
      <View style={styles.container}>
      <View style={styles.wrapperButton}>
         <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Image source={require('../../assets/images/elements/back.png')} style={styles.img} />
        </TouchableOpacity>
      </View>
      <Image source={require('../../assets/images/logo.png')} style={styles.logo} />
      <Image source={require('../../assets/images/elements/line.png')} style={styles.line} />
      <TouchableOpacity onPress={() => handleLevel('easy')} style={styles.easy}>
        <Image source={require('../../assets/images/elements/easy.png')} style={styles.img} />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => handleLevel('normal')} style={styles.normal}>
        <Image source={require('../../assets/images/elements/normal.png')} style={styles.img} />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => handleLevel('hard')} style={styles.hard}>
        <Image source={require('../../assets/images/elements/hard.png')} style={styles.img} />
      </TouchableOpacity>  
      <View style={styles.wrapperButton}>
         <TouchableOpacity style={styles.button} onPress={() => Linking.openURL('https://racketstep.click/alviacloud-policy')}>
          <Text style={[styles.buttonText, { fontFamily: fontsLoaded ? 'Lilita-One' : 'System' }]}>Privacy Policy</Text>
      </TouchableOpacity>
      </View>
      </View>
    </ImageBackground>
  );
};

export default HomeScreen;

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
 logo: {
  position: 'absolute',
  top: 0,  
  right: 0, 
  resizeMode: 'cover', 
 },
 easy: {
  position: 'absolute',
  top: '35%',  
  left: 30, 
  resizeMode: 'cover', 
 },
 normal: {
  position: 'absolute',
  top: '55%',  
  left: '35%', 
  resizeMode: 'cover', 
  zIndex: 1000,
 },
 hard: {
  position: 'absolute',
  bottom: '15%',  
  right: 20, 
  resizeMode: 'cover', 
  zIndex: 1000,
 },
 img: {
  resizeMode: 'cover', 
 },
 line: {
  position: 'absolute',
  bottom: '25%',  
  right: '15%', 
  resizeMode: 'cover', 
 },
 wrapperButton: {
  flex: 1, 
  width: '100%', 
  justifyContent: 'flex-start', 
  alignItems: 'flex-start', 
  paddingLeft: 20,
},
 backButton: {
  textAlign: 'left',
  justifyContent: 'flex-start',
  alignItems: 'center',
  marginBottom: 'auto', 
  marginTop: 60,
},
 button: {
  textAlign: 'left',
  justifyContent: 'flex-start',
  alignItems: 'center',
  marginTop: 'auto', 
  marginBottom: 60,
  marginLeft: 20,
},
buttonText: {
  justifyContent: 'flex-start',
  textAlign: 'left',
  color: '#FFFFFF',
  fontSize: 18,
  fontWeight: 'bold',
},
});
