import React from 'react';
import { Modal, View, Image, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { BlurView } from 'expo-blur';
import { useFonts } from '../context/FontContext';

const PuzzleModal = ({ visible, onRestart, onExit, result }) => {
    const { fontsLoaded } = useFonts();
  return (
    <Modal
      transparent
      visible={visible}
      animationType="fade"
    >
      <BlurView intensity={70} tint="dark" style={styles.modalOverlay}>
        <View style={styles.modalContainer}>
          {result ? 
          <Image source={require('../../assets/images/elements/win.png')} style={styles.modalImage} />
          :
          <Image source={require('../../assets/images/elements/lose.png')} style={styles.modalImage} /> 
          }
          <Text style={[styles.congratsText, { fontFamily: fontsLoaded ? 'Lilita-One' : 'System' }]}>
           {result ? 'Congratulations' : 'The Flight Didn`t Make It'} 
          </Text>
          <Text style={[styles.subText, { fontFamily: fontsLoaded ? 'Lilita-One' : 'System' }]}>
          {result ? 'You`ve successfully completed the puzzle!' : 'But don`t worry, you can try again!'} 
          </Text>

          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.modalButton} onPress={onRestart}>
              <Image source={require('../../assets/images/elements/restart.png')} style={styles.img} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.modalButton} onPress={onExit}>
            <Image source={require('../../assets/images/elements/menu.png')} style={styles.img} />
            </TouchableOpacity>
          </View>
        </View>
      </BlurView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    width: '100%',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  modalImage: {
    width: '100%',
    height: '70%',
    resizeMode: 'contain',
    marginBottom: 20,
  },
  congratsText: {
    marginTop: -100,
    fontSize: 48,
    lineHeight: 54.86,
    color: '#FFC00D',
    textAlign: 'center',
    fontFamily: 'Lilita-One',
  },
  subText: {
    fontSize: 27,
    lineHeight: 30.86,
    color: '#FFFFFF',
    textAlign: 'center',
    fontFamily: 'Lilita-One',
    marginBottom: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginTop: 20,
  },
  modalButton: {
    flexDirection: 'row',
    alignItems: 'center',
    // backgroundColor: '#007bff',
    paddingVertical: 5,
    paddingHorizontal: 5,
    borderRadius: 5,
    marginHorizontal: 5,
  },
  img: {
    resizeMode: 'cover', 
   },
});

export default PuzzleModal;
