import React, { useState, useEffect, useRef, useReducer } from 'react';
import './App.scss';
import Board from './components/Board';
import useInterval from './hooks/useInterval';

const generateRandom100 = () => {
	return Math.floor(Math.random() * 100) + 1;
};
// generate an array of 100 random values
let generate100 = () => {
	return Array.from({ length: 100 }, generateRandom100);
};

const createRandomNum = () => Math.floor(Math.random() * 100) + 1;

export default function App() {
	const [board, setBoard] = useState([
		[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
	]);

	const [startGame, setStartGame] = useState(false);

	const [gold, setGold] = useState(1000);
	const [income, setIncome] = useState(0);
	const [stone, setStone] = useState(0);
	const [combat, setCombat] = useState(0);
	const [food, setFood] = useState(0);

	const [land, setLand] = useState(0);
	const [val, setVal] = useState(generate100());

	const [farms, setFarms] = useState(0);
	const [megaFarms, setMegaFarms] = useState(0);

	const [stoneMines, setStoneMines] = useState(0);
	const [megaStoneMines, setMegaStoneMines] = useState(0);

	const [wolves, setWolves] = useState(0);
	const [alphaWolf, setAlphaWolf] = useState(0);

	const [emptyTile, setEmptyTile] = useState(0);
	const [mountain, setMountain] = useState(0);

	// Updates gold and land when player clicks a tile
	const handleClick = (amount) => {
		if (gold >= amount) {
			setGold((gold) => gold - amount);
			setLand((land) => land + 1);
		}
	};

	// Increase income
	const increaseIncome = () => {
		setIncome((income) => income + 5);
	};

	// Increase income every time land gets updated
	useEffect(() => {
		if (land > 0) increaseIncome();
	}, [land]);

	// Update gold every 5s
	useInterval(() => {
		setGold((gold) => gold + income);
	}, 5000);

	/*
      Create the Game Board on page refesh
      
      0 - Empty Tile
      1 - Farm
      2 - Mega Farm
      3 - Stone Mine
      4 - Mega Stone Mine
      5 - Wolf
      6 - Alpha Wolf
      7 - Mountain
  */
	const createGameBoard = () => {
		for (let i = 0; i < board.length; i++) {
			for (let j = 0; j < board[i].length; j++) {
				let random = createRandomNum();

				// create an empty tile 50% of the time
				if (random >= 50) {
					setBoard((prevBoard) => {
						prevBoard[i][j] = 0;
						return prevBoard;
					});
				}

				// Create a farm 9% of the time
				else if (random < 50 && random > 40) {
					// 5% chance to create Mega Farm
					let megaChance = createRandomNum();
					if (megaChance <= 5) {
						setBoard((prevBoard) => {
							prevBoard[i][j] = 2;
							return prevBoard;
						});
					} else {
						setBoard((prevBoard) => {
							prevBoard[i][j] = 3;
							return prevBoard;
						});
					}
				}

				// 19% chance to create an stone mine
				else if (random > 20 && random <= 40) {
					// 5% chance to create Mega Stone mine
					let megaChance = createRandomNum();
					if (megaChance <= 5) {
						setBoard((prevBoard) => {
							prevBoard[i][j] = 4;
							return prevBoard;
						});
					} else {
						setBoard((prevBoard) => {
							prevBoard[i][j] = 3;
							return prevBoard;
						});
					}
				}

				// 10%
				else if (random <= 20 && random > 9) {
					// 5% chance to create Alpha Wolf
					let megaChance = createRandomNum();
					if (megaChance <= 5) {
						setBoard((prevBoard) => {
							prevBoard[i][j] = 6;
							return prevBoard;
						});
					} else {
						setBoard((prevBoard) => {
							prevBoard[i][j] = 5;
							return prevBoard;
						});
					}
				} else {
					setBoard((prevBoard) => {
						prevBoard[i][j] = 7;
						return prevBoard;
					});
				}
			}
		}
	};

	useEffect(() => {
		createGameBoard();
	}, []);

	const handleStartGame = () => setStartGame(true);

	return (
		<div className="container">
			{startGame && (
				<ul className="overview">
					<li>{`Gold: ${gold}`}</li>
					<li>{`Income: ${income}`}</li>
					<li>{`Land: ${land}`}</li>
					<li>{`Food: ${food}`}</li>
					<li>{`Stone: ${stone}`}</li>
					<li>{`Combat: ${combat}`}</li>
				</ul>
			)}

			{!startGame && (
				<button className={'start-button'} onClick={handleStartGame}>
					Start Game
				</button>
			)}
			{startGame && (
				<Board
					board={board}
					className="board-container"
					handleClick={handleClick}
					memoArr={val}
				/>
			)}
		</div>
	);
}
