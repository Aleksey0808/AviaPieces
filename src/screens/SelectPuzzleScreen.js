import React from 'react';
import { StyleSheet, ImageBackground, View, Text, TouchableOpacity, FlatList, Image } from 'react-native';
import { useFonts } from '../context/FontContext';

const SelectPuzzleScreen = ({ navigation, route }) => {
  const { fontsLoaded } = useFonts();
  const { selectLevel } = route.params;
  
  const levelData = selectLevel[0]; 
  const puzzles = levelData.puzzles || []; 

  const handlePuzzleSelect = (puzzle) => {
    navigation.navigate('Game', { puzzle, levelData });
  };

  return (
    <ImageBackground
      source={require('../../assets/images/bg/bgGame.jpg')}
      style={styles.bgContainer}
    >
      <View style={styles.container}>
        <Text style={[styles.title, { fontFamily: fontsLoaded ? 'Lilita-One' : 'System' }]}>
          {levelData.level}
        </Text>
        <FlatList
          data={puzzles}
          numColumns={2}
          keyExtractor={(item) => item.id.toString()} 
          contentContainerStyle={styles.listContent}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => handlePuzzleSelect(item)} style={styles.puzzleItem}>
              <Image source={item.image} style={styles.puzzleImage} />
            </TouchableOpacity>
          )}
        />
      </View>
    </ImageBackground>
  );
};

export default SelectPuzzleScreen;

const styles = StyleSheet.create({
  bgContainer: {
    flex: 1,
    resizeMode: 'cover',
  },
  container: {
    flex: 1,
    paddingVertical: 40,
    paddingHorizontal: 20,
    // justifyContent: 'center',
    // alignItems: 'center',
  },
  title: {
    fontSize: 28,
    color: '#FFF',
    marginBottom: 30,
    textAlign: 'center',
  },
  listContent: {
    paddingHorizontal: 10,
    paddingBottom: 20,
    justifyContent: 'center',
  },
  puzzleItem: {
    flex: 1,
    alignItems: 'center',
    margin: 10,
    padding: 10,
    borderRadius: 12,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
  },
  puzzleImage: {
    width: 160,
    height: 160,
    borderRadius: 10,
    resizeMode: 'cover',
  },
});
