import React, { useState, useEffect } from 'react';
import { StyleSheet, ImageBackground, View, Image, Text, TouchableOpacity, FlatList } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const GameScreen = ({ route }) => {
  const { puzzle, levelData } = route.params;
  const [selectedPiece, setSelectedPiece] = useState(null);
  const [grid, setGrid] = useState([]);
  const [remainingPieces, setRemainingPieces] = useState(puzzle.pieces);
  const [columns, setColumns] = useState(2);
  const [showSolution, setShowSolution] = useState(false); 
  const [defaultImg, setDefaultImg] = useState(require('../../assets/images/elements/easyDef.png')); 

  useEffect(() => {
    const setupGrid = async () => {
      const savedGrid = await AsyncStorage.getItem(`savedGrid_${levelData.level}`);
      if (savedGrid) {
        setGrid(JSON.parse(savedGrid));
      } else {
        const emptyGrid = Array(puzzle.pieces.length).fill(null);
        setGrid(emptyGrid);
      }
    };
    
    if (levelData.level === 'easy') {
      setColumns(2);
      setDefaultImg(require('../../assets/images/elements/easyDef.png'))
    } else if (levelData.level === 'normal') {
      setColumns(3);
      setDefaultImg(require('../../assets/images/elements/normalDef.png'))
    } else if (levelData.level === 'hard') {
      setColumns(4);
      setDefaultImg(require('../../assets/images/elements/hardDef.png'))
    }
    
    setupGrid();
    
    setShowSolution(true);
    setTimeout(() => {
      setShowSolution(false);
    }, 3000);
  }, [puzzle, levelData.level]);

  const saveGameState = async (newGrid) => {
    await AsyncStorage.setItem(`savedGrid_${levelData.level}`, JSON.stringify(newGrid));
  };

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

      saveGameState(newGrid); 
    }
  };

  const restartGame = () => {
    const emptyGrid = Array(puzzle.pieces.length).fill(null);
    setGrid(emptyGrid);
    setRemainingPieces(puzzle.pieces);
    setSelectedPiece(null);
    AsyncStorage.removeItem(`savedGrid_${levelData.level}`);
  };

  const renderPuzzlePieces = () => (
    <FlatList
      data={remainingPieces}
      horizontal
      keyExtractor={(item, index) => `${index}-${levelData.level}-${new Date().getTime()}`}
      renderItem={({ item }) => (
        <TouchableOpacity onPress={() => handlePieceSelect(item)}>
          <Image source={item.image} style={styles.pieceImage} />
        </TouchableOpacity>
      )}
      contentContainerStyle={styles.pieceList}
    />
  );

  const renderPuzzleGrid = () => {
    const renderItem = ({ item, index }) => (
      <TouchableOpacity
        style={styles.gridCell}
        onPress={() => handleGridCellPress(index)}
      >
        {item || showSolution ? (
          <Image source={item ? item.image : puzzle.pieces[index].image} style={styles.gridCellImage} />
        ) : (
          <Image source={defaultImg} style={styles.gridCellImage} />
        )}
      </TouchableOpacity>
    );

    return (
      <FlatList
        data={grid}
        numColumns={columns}
        renderItem={renderItem}
        keyExtractor={(item, index) => `${index}-${columns}-${levelData.level}`}
        style={styles.grid}
        contentContainerStyle={styles.gridContainer}
        key={`${columns}-${levelData.level}`} 
      />
    );
  };

  const handleShowSolution = () => {
    setShowSolution(true);
    setTimeout(() => {
      setShowSolution(false);
    }, 3000);
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
        <TouchableOpacity style={styles.solutionButton} onPress={handleShowSolution}>
          <Text style={styles.solutionButtonText}>Show solution</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.restartButton} onPress={restartGame}>
          <Text style={styles.restartButtonText}>reload game</Text>
        </TouchableOpacity>
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
    alignItems: 'center',
    justifyContent: 'center',
  },
  gridCell: {
    width: 100,
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
  solutionButton: {
    backgroundColor: '#00f',
    padding: 10,
    borderRadius: 5,
    position: 'absolute',
    bottom: 20,
    right: 20,
  },
  solutionButtonText: {
    color: '#FFF',
    fontSize: 16,
  },
  restartButton: {
    backgroundColor: '#f00',
    padding: 10,
    borderRadius: 5,
    position: 'absolute',
    bottom: 20,
    left: 20,
  },
  restartButtonText: {
    color: '#FFF',
    fontSize: 16,
  },
});

export default GameScreen;
