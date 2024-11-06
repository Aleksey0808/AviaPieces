import React from 'react';
import { Modal, View, Image, Text, TouchableOpacity, StyleSheet } from 'react-native';

const PuzzleModal = ({ visible, onRestart, onExit, message }) => {
  return (
    <Modal
      transparent
      visible={visible}
      animationType="fade"
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContainer}>
          <Text style={styles.messageText}>{message}</Text>
          {/* <Image source={require('../../assets/images/elements/win.png')} style={styles.modalImage} /> */}
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.modalButton} onPress={onRestart}>
              <Text style={styles.buttonText}>Перезапуск</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.modalButton} onPress={onExit}>
              <Text style={styles.buttonText}>В меню</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    width: '80%',
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 10,
    alignItems: 'center',
  },
  modalImage: {
    width: 100,
    height: 100,
    resizeMode: 'cover',
    marginVertical: 20,
  },
  messageText: {
    fontSize: 20,
    color: '#333',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
  },
  modalButton: {
    backgroundColor: '#007bff',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginHorizontal: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default PuzzleModal;
