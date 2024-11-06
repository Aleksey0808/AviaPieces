import React, { useState, useEffect } from 'react';
import { StyleSheet, ImageBackground, View, Image, TouchableOpacity, FlatList } from 'react-native';
import PuzzleModal from '../components/PuzzleModal';

const GameScreen = ({ route, navigation }) => {
  const { puzzle, levelData } = route.params;
  const [selectedPiece, setSelectedPiece] = useState(null);
  const [grid, setGrid] = useState([]);
  const [remainingPieces, setRemainingPieces] = useState([]);
  const [columns, setColumns] = useState(2);
  const [showSolution, setShowSolution] = useState(false);
  const [defaultImg, setDefaultImg] = useState(require('../../assets/images/elements/easyDef.png'));
  const [modalVisible, setModalVisible] = useState(false);
  const [gameResult, setGameResult] = useState('');

  useEffect(() => {
    if (levelData.level === 'easy') {
      setColumns(2);
      setDefaultImg(require('../../assets/images/elements/easyDef.png'));
    } else if (levelData.level === 'normal') {
      setColumns(3);
      setDefaultImg(require('../../assets/images/elements/normalDef.png'));
    } else if (levelData.level === 'hard') {
      setColumns(4);
      setDefaultImg(require('../../assets/images/elements/hardDef.png'));
    }

    const emptyGrid = Array(puzzle.pieces.length).fill(null);
    setGrid(emptyGrid);
    setRemainingPieces(puzzle.pieces);
    
    setShowSolution(true);
    setTimeout(() => {
      setShowSolution(false);
    }, 3000);
  }, [puzzle, levelData.level]);

  const checkWinCondition = (updatedGrid) => {
    if (updatedGrid.every((item, idx) => item && item.id === puzzle.pieces[idx].id)) {
      setGameResult(true);
    } else {
      setGameResult(false);
    }
    setModalVisible(true);
  };

  const handlePieceSelect = (piece) => {
    setSelectedPiece(piece);
  };

  const handleGridCellPress = (index) => {
    if (selectedPiece && !grid[index]) {
      const newGrid = [...grid];
      newGrid[index] = selectedPiece;
      setGrid(newGrid);

      const pieceIndex = remainingPieces.findIndex(piece => piece.id === selectedPiece.id);
      if (pieceIndex !== -1) {
        const updatedRemainingPieces = [...remainingPieces];
        updatedRemainingPieces.splice(pieceIndex, 1);
        setRemainingPieces(updatedRemainingPieces);

        if (updatedRemainingPieces.length === 0) {
          checkWinCondition(newGrid);
        }
      }
      setSelectedPiece(null);
    }
  };

  const restartGame = () => {
    const emptyGrid = Array(puzzle.pieces.length).fill(null);
    setGrid(emptyGrid);
    setRemainingPieces(puzzle.pieces);
    setSelectedPiece(null);
    setModalVisible(false);

    setShowSolution(true);
    setTimeout(() => {
      setShowSolution(false);
    }, 3000);
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
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Image source={require('../../assets/images/elements/back.png')} style={styles.img} />
        </TouchableOpacity>
        
        <View style={styles.puzzleContainer}>
          {renderPuzzleGrid()}
        </View>
        
        <View style={styles.piecesContainer}>
          {renderPuzzlePieces()}
        </View>
        
        <TouchableOpacity style={styles.showButton} onPress={handleShowSolution}>
          <Image source={require('../../assets/images/elements/show.png')} style={styles.img} />
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.resButton} onPress={restartGame}>
          <Image source={require('../../assets/images/elements/restart.png')} style={styles.img} />
        </TouchableOpacity>
        
        <PuzzleModal 
          visible={modalVisible}
          onRestart={restartGame}
          onExit={() => navigation.goBack()}  
          result={gameResult}
        />
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
  puzzleContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    marginTop: 40,  
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
  backButton: {
    position: 'absolute',
    top: '5%',  
    left: '5%', 
    zIndex: 1000,
  },
  showButton: {
    position: 'absolute',
    bottom: '25%',  
    right: '5%',  
  },
  resButton: {
    position: 'absolute',
    bottom: '25%',  
    left: '5%',  
  },
  img: {
    resizeMode: 'cover', 
  },
});

export default GameScreen;
