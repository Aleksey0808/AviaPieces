import React, { useState, useEffect } from 'react';
import { StyleSheet, ImageBackground, View, Image, Text, TouchableOpacity, FlatList } from 'react-native';

const GameScreen = ({ route }) => {
  const { puzzle, levelData } = route.params; 
  const [selectedPiece, setSelectedPiece] = useState(null); 
  const [grid, setGrid] = useState([]); 
  const [remainingPieces, setRemainingPieces] = useState(puzzle.pieces); 
  const [columns, setColumns] = useState(2); 
  console.log(levelData.level)

  useEffect(() => {
    console.log("Puzzle level:", puzzle);
    if (levelData.level === 'easy') {
      console.log('easy')
      setColumns(2);
    } else if (levelData.level === 'normal') {
      console.log('normal')
      setColumns(3);
    } else if (levelData.level === 'hard') {
      console.log('hard')
      setColumns(4);
    }

    const numberOfPieces = puzzle.pieces.length;
    const emptyGrid = Array(numberOfPieces).fill(null); 
    setGrid(emptyGrid);
  }, []);

  const handlePieceSelect = (piece) => {
    setSelectedPiece(piece);
  };

  const handleGridCellPress = (index) => {
    if (selectedPiece && !grid[index]) {
      const newGrid = [...grid];
      newGrid[index] = selectedPiece;
      setGrid(newGrid);

      const newRemainingPieces = remainingPieces.filter(piece => piece.id !== selectedPiece.id);
      setRemainingPieces(newRemainingPieces);

      setSelectedPiece(null);
    }
  };

  const renderPuzzlePieces = () => {
    return (
      <FlatList
        data={remainingPieces}
        horizontal
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => handlePieceSelect(item)}>
            <Image source={item.image} style={styles.pieceImage} />
          </TouchableOpacity>
        )}
        contentContainerStyle={styles.pieceList} 
      />
    );
  };

  const renderPuzzleGrid = () => {
    const renderItem = ({ item, index }) => (
      <TouchableOpacity
        key={index}
        style={styles.gridCell}
        onPress={() => handleGridCellPress(index)}
      >
        {item ? (
          <Image source={item.image} style={styles.gridCellImage} />
        ) : (
          <View style={styles.emptyCell} />
        )}
      </TouchableOpacity>
    );

    return (
      <FlatList
        data={grid}
        numColumns={columns} 
        renderItem={renderItem}
        keyExtractor={(item, index) => `${index}-${columns}`}
        style={styles.grid}
        contentContainerStyle={styles.gridContainer} 
        key={columns}
      />
    );
  };

  return (
    <ImageBackground
      source={require('../../assets/images/bg/bgGame.jpg')}
      style={styles.bgContainer}
    >
      <View style={styles.container}>
        <Text style={styles.title}>{puzzle.name}</Text>

        {renderPuzzleGrid()} 

        <View style={styles.piecesContainer}>
          {renderPuzzlePieces()} 
        </View>
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
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 40,
  },
  title: {
    fontSize: 28,
    color: '#FFF',
    marginBottom: 20,
  },
  piecesContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
    marginBottom: 40,
  },
  pieceImage: {
    width: 80,
    height: 80,
    resizeMode: 'cover',
    margin: 10,
  },
  pieceList: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  grid: {
    width: '100%',
    marginBottom: 20,
  },
  gridContainer: {
    alignItems: 'center', // Убираем flexWrap
    justifyContent: 'center',
  },
  gridCell: {
    width: 100, // Подгоните под нужные размеры ячеек
    height: 100,
    margin: 5,
    borderWidth: 2,
    borderColor: '#ccc',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#eee',
  },
  gridCellImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  emptyCell: {
    width: '100%',
    height: '100%',
    backgroundColor: '#eee',
  },
});



export default GameScreen;
