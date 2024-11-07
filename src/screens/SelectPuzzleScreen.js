import React from 'react';
import { StyleSheet, ImageBackground, View, Text, TouchableOpacity, FlatList, Image } from 'react-native';
import { useFonts } from '../context/FontContext';
import { LinearGradient } from 'expo-linear-gradient';

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
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
            <Image source={require('../../assets/images/elements/back.png')} style={styles.img} />
        </TouchableOpacity>
        <View style={styles.wrappe}>
          <Text style={[styles.title, { fontFamily: fontsLoaded ? 'Lilita-One' : 'System' }]}>
          {levelData.level}
        </Text>
        </View>
        <FlatList
          data={puzzles}
          numColumns={2}
          keyExtractor={(item) => item.id.toString()} 
          contentContainerStyle={styles.listContent}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => handlePuzzleSelect(item)} style={styles.puzzleItem}>
                <LinearGradient
                  colors={['rgba(122, 115, 105, 0.2)', 'rgba(234, 196, 139, 0.2)', 'rgba(122, 105, 105, 0.2)']}
                  start={{ x: 0.5, y: 0 }}
                  end={{ x: 0.5, y: 1 }}
                  style={styles.gradientBorder}
                >
              <Image source={item.image} style={styles.puzzleImage} />
              </LinearGradient>
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
  wrapperTitle: {
    marginTop: 150,
    alignItems: 'center',
  },
  title: {
    fontSize: 30,
    color: '#FFF',
    marginTop: 30,
    textAlign: 'center',
    // textTransform: 'uppercase',
  },
  listContent: {
    flex: 1,
    paddingHorizontal: 10,
    paddingBottom: 20,
    justifyContent: 'center',
  },
  puzzleItem: {
    width: 160, 
    height: 130, 
    margin: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  gradientBorder: {
    padding: 8, 
    borderRadius: 8, 
  },
  puzzleImage: {
    resizeMode: 'cover', 
  },
  backButton: {
    position: 'absolute',
    top: '5%',  
    left: '5%', 
    zIndex: 1000,
  },
  img: {
    resizeMode: 'cover', 
  },
});
