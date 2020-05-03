import React, { useState, useEffect, useRef, useCallback } from 'react';
import './App.scss';
import Board from './components/Board';
import useInterval from './hooks/useInterval';
import Overview from './components/Overview';

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

	let gold = useRef(750);
	let income = useRef(0);
	let stone = useRef(0);
	let combat = useRef(0);
	let food = useRef(0);
	let land = useRef(0);

	// const [ref, setRef] = useState(null);

	// const onRefChange = useCallback((node) => {
	// 	// ref value changed to node
	// 	// setRef(node); // e.g. change ref state to trigger re-render
	// 	if (node === null) {
	// 		// node is null, if DOM node of ref had been unmounted before
	// 	} else {
	// 		// ref value exists

	// 	}
	// }, []);

	// const [val, setVal] = useState(generate100());

	// const [farms, setFarms] = useState(0);
	// const [megaFarms, setMegaFarms] = useState(0);

	// const [stoneMines, setStoneMines] = useState(0);
	// const [megaStoneMines, setMegaStoneMines] = useState(0);

	// const [wolves, setWolves] = useState(0);
	// const [alphaWolf, setAlphaWolf] = useState(0);

	// const [emptyTile, setEmptyTile] = useState(0);
	// const [mountain, setMountain] = useState(0);

	// Updates gold and land when player clicks a tile
	// const handleClick = (amount) => {
	// 	if (gold.current >= amount) {
	// 		gold.current = gold.current - amount;
	// 		land.current = land.current + 1;
	// 		// setGold((gold) => gold - amount);
	// 		// setLand((land) => land + 1);
	// 	}
	// };

	// Increase income
	const increaseIncome = () => {
		// setIncome((income) => income + 5);
		income.current = income.current + 5;
	};

	// Increase income every time land gets updated
	useEffect(() => {
		if (land.current > 0) increaseIncome();
	}, [land.current]);

	// Update gold every 5s
	useInterval(() => {
		// setGold((gold) => gold + income);
		// gold = gold + income;
		gold.current = gold.current + income.current;
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
					if (megaChance <= 12) {
						setBoard((prevBoard) => {
							prevBoard[i][j] = 2;
							return prevBoard;
						});
					} else {
						setBoard((prevBoard) => {
							prevBoard[i][j] = 1;
							return prevBoard;
						});
					}
				}

				// 19% chance to create an stone mine
				else if (random > 20 && random <= 40) {
					// 5% chance to create Mega Stone mine
					let megaChance = createRandomNum();
					if (megaChance <= 12) {
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
					if (megaChance <= 8) {
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
		!startGame && createGameBoard();
	}, []);

	const handleStartGame = () => setStartGame(true);

	return (
		<div className="container">
			{startGame && (
				<Overview
					ref={{
						gold: gold,
						land: land,
						food: food,
						stone: stone,
						combat: combat,
						income: income,
					}}
				/>
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
					ref={{
						gold: gold,
						land: land,
						food: food,
						stone: stone,
						combat: combat,
						income: income,
					}}
				/>
			)}
		</div>
	);
}
