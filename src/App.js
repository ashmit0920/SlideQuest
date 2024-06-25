import React, { useState, useEffect } from 'react';
import './App.css';

function shuffle(array) {
  let currentIndex = array.length, temporaryValue, randomIndex;
  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }
  return array;
}

function isSolvable(arr) {
  let invCount = 0;
  for (let i = 0; i < arr.length - 1; i++) {
    for (let j = i + 1; j < arr.length; j++) {
      if (arr[i] && arr[j] && arr[i] > arr[j]) {
        invCount++;
      }
    }
  }
  return invCount % 2 === 0;
}

function App() {
  const initialTiles = [1, 2, 3, 4, 5, 6, 7, 8, null];
  const [tiles, setTiles] = useState(shuffle([...initialTiles]));

  useEffect(() => {
    while (!isSolvable(tiles)) {
      setTiles(shuffle([...initialTiles]));
    }
  }, []);

  const handleTileClick = (index) => {
    const newTiles = [...tiles];
    const emptyIndex = tiles.indexOf(null);

    const isAdjacent =
      [index - 1, index + 1, index - 3, index + 3].includes(emptyIndex) &&
      !(index % 3 === 2 && emptyIndex % 3 === 0) &&
      !(index % 3 === 0 && emptyIndex % 3 === 2);

    if (isAdjacent) {
      [newTiles[index], newTiles[emptyIndex]] = [newTiles[emptyIndex], newTiles[index]];
      setTiles(newTiles);
    }
  };

  const isComplete = tiles.every((tile, index) => tile === initialTiles[index]);

  return (
    <div className="App">
      <h1>Sliding Puzzle Game</h1>
      <div className="grid">
        {tiles.map((tile, index) => (
          <div
            key={index}
            className={`tile ${tile === null ? 'empty' : ''}`}
            onClick={() => handleTileClick(index)}
          >
            {tile}
          </div>
        ))}
      </div>
      {isComplete && <div className="message">Congratulations! You solved the puzzle!</div>}
    </div>
  );
}

export default App;
