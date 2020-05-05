import React, { useState, useEffect } from 'react';
import './App.scss';
import useInterval from './hooks/useInterval';
import AlphaWolf from './images/alpha-wolf-colored.png';
import Wolf from './images/wolf-colored.png';
import Farm from './images/farm-colored.png';
import MegaFarm from './images/mega-farm-colored.png';
import StoneMine from './images/stone-mine-colored.png';
import MegaStoneMine from './images/mega-stone-mine-colored.png';
import Mountain from './images/mountain-colored.png';

import Gold from './images/gold-bar.png';
import Income from './images/income.png';
import Land from './images/land.png';
import Stone from './images/stone.png';
import Food from './images/food.png';
import Combat from './images/combat.png';

const createRandomNum = () => Math.floor(Math.random() * 100) + 1;

export default function App() {
	const initBoardLayout = [
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
	];
	const [board, setBoard] = useState(initBoardLayout);

	const [startGame, setStartGame] = useState(false);
	const [boardCreated, setBoardCreated] = useState(false);

	const [gold, setGold] = useState(1000);
	const [income, setIncome] = useState(0);
	const [stone, setStone] = useState(200);
	const [combat, setCombat] = useState(50);
	const [food, setFood] = useState(5);
	const [base, setBase] = useState(false);

	const [land, setLand] = useState(0);

	const [numStoneMines, setNumStoneMines] = useState(0);
	const [numMegaStoneMines, setNumMegaStoneMines] = useState(0);
	const [numWolves, setNumWolves] = useState(0);
	const [numAlphaWolves, setNumAlphaWolves] = useState(0);
	const [numFarms, setNumFarms] = useState(0);
	const [numMegaFarms, setNumMegaFarms] = useState(0);
	const [numMountains, setNumMountains] = useState(0);
	const [numEmpty, setNumEmpty] = useState(0);

	const [clickMultiplier, setClickMultiplier] = useState(1);

	const [goodEconomy, setGoodEconomy] = useState(false);
	const [greatEconomy, setGreatEconomy] = useState(false);
	const [badEconomy, setBadEconomy] = useState(false);
	const [horribleEconomy, setHorribleEconomy] = useState(false);

	const goodEconomyMultiplier = 1.4;
	const greatEconomyMultiplier = 2;
	const badEconomyMultiplier = 0.8;
	const horribleEconomyMultiplier = 0.2;

	const alphaWolfCombat = 2500;
	const wolfCombat = 250;
	const mountainCombat = 200;

	let landGold = 5;

	// Update Tiles / Resources Functions
	const updateGold = (cost) => setGold((gold) => gold - cost);
	const updateLand = () => setLand((land) => land + 1);
	const updateStone = (cost) => setStone((stone) => stone - cost);
	const updateCombat = (cost) => setCombat(combat);

	// Increase income
	const increaseIncome = () => {
		if (goodEconomy) {
			setIncome((income) => {
				let totalincome = land * landGold;
				return totalincome * goodEconomyMultiplier;
			});
		} else if (greatEconomy) {
			setIncome((income) => {
				let totalincome = land * landGold;

				return totalincome * greatEconomyMultiplier;
			});
		} else if (badEconomy) {
			setIncome((income) => {
				let totalincome = land * landGold;

				return totalincome * badEconomyMultiplier;
			});
		} else if (horribleEconomy) {
			setIncome((income) => {
				let totalincome = land * landGold;

				return totalincome * horribleEconomyMultiplier;
			});
		} else {
			setIncome((income) => land * landGold);
		}
	};

	// check economy health every time food changes
	useEffect(() => {
		if (food >= 105 && food < 150) {
			setHorribleEconomy(false);
			setBadEconomy(false);
			setGreatEconomy(false);
			setGoodEconomy(true);
		}

		if (food > 150) {
			setHorribleEconomy(false);
			setBadEconomy(false);
			setGoodEconomy(false);
			setGreatEconomy(true);
		}

		if (food <= 95 && food > 50) {
			setGreatEconomy(false);
			setGoodEconomy(false);
			setHorribleEconomy(false);
			setBadEconomy(true);
		}

		if (food <= 50) {
			setGreatEconomy(false);
			setGoodEconomy(false);
			setBadEconomy(false);
			setHorribleEconomy(true);
		}

		// if (food <= 0) {

		// }
	}, [food]);

	// const restartGame = () => {
	// 	setBoard(initBoardLayout);
	// };

	// update income based on enconomy health food and land
	useEffect(() => {
		if (land >= 5) increaseMultiplier();
		increaseIncome();
	}, [land, food]);

	const increaseMultiplier = () => {
		if (land >= 5) setClickMultiplier(2);
		if (land >= 10) setClickMultiplier(5);
		if (land >= 15) setClickMultiplier(10);
	};

	// Update resources every 5s
	useInterval(() => {
		setGold((gold) => Math.round(gold + income));
		setStone((stone) =>
			Math.round(stone + numStoneMines * 20 + numMegaStoneMines * 140)
		);
		setFood(
			(food) => Math.round(food - land * 1) + numFarms * 2 + numMegaFarms * 15
		);
	}, 4000);

	const createGameBoard = () => {
		const initData = (i, j, type) => {
			// initial tile data
			let manual = {
				Empty: {
					amount: {
						gold: 150,
						stone: 0,
						combat: 0,
					},
					image: null,
				},
				Farm: {
					amount: {
						gold: 250,
						stone: 100,
						combat: 0,
					},
					image: Farm,
				},
				MegaFarm: {
					amount: {
						gold: 1000,
						stone: 200,
						combat: 0,
					},
					image: MegaFarm,
				},
				StoneMine: {
					amount: {
						gold: 400,
						stone: 0,
						combat: 0,
					},
					image: StoneMine,
				},
				MegaStoneMine: {
					amount: {
						gold: 2000,
						stone: 200,
						combat: 250,
					},
					image: MegaStoneMine,
				},
				Wolf: {
					amount: {
						gold: 150,
						combat: 250,
						stone: 0,
					},
					image: Wolf,
				},
				AlphaWolf: {
					amount: {
						gold: 150,
						stone: 0,
						combat: 1500,
					},
					image: AlphaWolf,
				},
				Mountain: {
					amount: {
						gold: 750,
						stone: 50,
						combat: 50,
					},
					image: Mountain,
				},
			};

			return {
				position: [i, j],
				i: i,
				j: j,
				isBought: false,
				type: type,
				image: manual[type].image,
				cost: manual[type].amount,
			};
		};

		for (let i = 0; i < board.length; i++) {
			for (let j = 0; j < board[i].length; j++) {
				// create a random number
				let random = createRandomNum();

				// create an empty tile 50% of the time
				if (random >= 50) {
					setBoard((prevBoard) => {
						prevBoard[i][j] = initData(i, j, 'Empty');
						return prevBoard;
					});
				}

				// Create a farm 9% of the time
				else if (random < 50 && random > 40) {
					// 5% chance to create Mega Farm
					let megaChance = createRandomNum();
					if (megaChance <= 12) {
						setBoard((prevBoard) => {
							prevBoard[i][j] = initData(i, j, 'MegaFarm');
							return prevBoard;
						});
					} else {
						setBoard((prevBoard) => {
							prevBoard[i][j] = initData(i, j, 'Farm');
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
							prevBoard[i][j] = initData(i, j, 'MegaStoneMine');
							return prevBoard;
						});
					} else {
						setBoard((prevBoard) => {
							prevBoard[i][j] = initData(i, j, 'StoneMine');
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
							prevBoard[i][j] = initData(i, j, 'AlphaWolf');
							return prevBoard;
						});
					} else {
						setBoard((prevBoard) => {
							prevBoard[i][j] = initData(i, j, 'Wolf');
							return prevBoard;
						});
					}
				} else {
					setBoard((prevBoard) => {
						prevBoard[i][j] = initData(i, j, 'Mountain');
						return prevBoard;
					});
				}
			}
		}
		setBoardCreated(true);
	};

	const initBoard = () => {
		createGameBoard();
	};

	// create the game board if the user has clicked to start the game
	useEffect(() => {
		!startGame && initBoard();
	}, []);

	useEffect(() => {
		addNeighborData();
	}, [boardCreated]);

	// start the game
	const handleStartGame = () => setStartGame(true);

	// Create tiles depending on the data passed in
	const tileCreationFactory = (data) => {
		let isBought = data.isBought;
		let isBase = data.isBase;
		let gold = data.cost.gold;
		let image = data.image;
		let type = data.type;
		let i = data.i;
		let j = data.j;

		return (
			<li
				className={
					isBought
						? isBase
							? ' tile-is-bought base'
							: 'tile-is-bought'
						: 'tile'
				}
				key={`[${i},${j}]`}
				onClick={() => handleClick(data)}
			>
				{isBought ? isBase ? 'B' : <span>{'Owned'}</span> : gold}
				{type !== 'Empty' ? <img src={image} className="tile-icon" /> : null}
			</li>
		);
	};

	// Updates gold and land when player clicks a tile
	const handleClick = (data) => {
		// first click
		if (
			!base &&
			gold >= data.cost.gold &&
			stone >= data.cost.stone &&
			combat >= data.cost.combat
		) {
			purchaseBase(data);
		}

		if (data.isBought === true) return;

		// determine if player has enough resources
		if (
			base &&
			gold >= data.cost.gold &&
			stone >= data.cost.stone &&
			combat >= data.cost.combat
		) {
			updateTile(data);
		}
	};

	const purchaseBase = (data) => {
		reduceResources(data.cost.gold, data.cost.stone, data.cost.combat);
		setBase(true);
		updateStructureCount(data.type);
		setBoard((prevBoard) => {
			prevBoard[data.i].splice(data.j, 1, {
				...data,
				...updateIsBought(data),
				...updateIsBase(data),
			});
			return prevBoard;
		});
	};

	// Update isBought: true
	const updateIsBought = (data) => Object.assign(data, { isBought: true });
	const updateIsBase = (data) => Object.assign(data, { isBase: true });

	const reduceResources = (goldCost, stoneCost, combatCost) => {
		if (goldCost > 0) updateGold(goldCost);
		if (stoneCost > 0) updateStone(stoneCost);
		if (combatCost > 0) updateCombat(combatCost);
	};

	const updateStructureCount = (type) => {
		if (type === 'Farm') setNumFarms((x) => x + 1);
		if (type === 'MegaFarm') setNumMegaFarms((x) => x + 1);
		if (type === 'Wolf') {
			setNumWolves((x) => x + 1);
			setCombat((combat) => combat + wolfCombat);
		}

		if (type === 'AlphaWolf') {
			setNumAlphaWolves((x) => x + 1);
			setCombat((combat) => combat + alphaWolfCombat);
		}
		if (type === 'StoneMine') setNumStoneMines((x) => x + 1);
		if (type === 'MegaStoneMine') setNumMegaStoneMines((x) => x + 1);
		if (type === 'Mountain') {
			setNumMountains((x) => x + 1);
			setCombat((combat) => combat + mountainCombat);
		}
		if (type === 'Empty') setNumEmpty((x) => x + 1);

		updateLand();
	};

	// Update Tile
	const updateTile = (data) => {
		reduceResources(data.cost.gold, data.cost.stone, data.cost.combat);
		updateStructureCount(data.type);
		setBoard((prevBoard) => {
			prevBoard[data.i].splice(data.j, 1, { ...data, ...updateIsBought(data) });
			return prevBoard;
		});
	};

	const addNeighborData = () => {
		for (let i = 0; i < board.length - 1; i++) {
			for (let j = 0; j < board[i].length - 1; j++) {
				let data = board[i][j];
				// let neighbors = getNeighbors(i, j, data);
				// console.log(typeof board[i - 1][j + 1] === 'undefined');

				// for (let k = 0; k < neighbors.length; k++) {
				// 	let numStoneMines = 0;
				// 	let numMegaStoneMines = 0;
				// 	let numFarm = 0;
				// 	let numMegaFarm = 0;
				// 	let numWolf = 0;
				// 	let numAlphaWolf = 0;
				// 	let numMountain = 0;

				// 	if (neighbors[k].type === 'Wolf') numWolf += 1;
				// 	if (neighbors[k].type === 'AlphaWolf') numAlphaWolf += 1;
				// 	if (neighbors[k].type === 'Farm') numFarm += 1;
				// 	if (neighbors[k].type === 'MegaFarm') numMegaFarm += 1;
				// 	if (neighbors[k].type === 'StoneMine') numStoneMines += 1;
				// 	if (neighbors[k].type === 'MegaStoneMine') numMegaStoneMines += 1;
				// 	if (neighbors[k].type === 'Mountain') numMountain += 1;

				// 	let newData = {
				// 		neighbors: {
				// 			StoneMine: numStoneMines,
				// 			MegaStoneMine: numMegaStoneMines,
				// 			Farm: numFarm,
				// 			MegaFarm: numMegaFarm,
				// 			Wolf: numWolf,
				// 			AlphaWolf: numAlphaWolf,
				// 			Mountain: numMountain,
				// 		},
				// 	};

				// 	neighbors[k] = Object.assign({ ...data, ...newData });
				// }
			}
		}
	};

	const getNeighbors = (i, j) => {
		/* Check for every neightbor
			[] [] []
			[] [] []
			[] [] []
		*/
		const clonedArr = board.slice();
		const neighbors = [];

		console.log(neighbors);

		// if (clonedArr[i - 1][j - 1]) neighbors.push(clonedArr[i - 1][j - 1]);

		// if (clonedArr[i - 1][j - 1] !== undefined)
		// 	neighbors.push(clonedArr[i - 1][j - 1]);
		// if (clonedArr[i - 1][j] !== undefined) neighbors.push(clonedArr[i - 1][j]);
		// if (clonedArr[i - 1][j + 1] !== undefined)
		// 	neighbors.push(clonedArr[i - 1][j + 1]);

		// if (clonedArr[i + 1][j - 1] !== undefined)
		// 	neighbors.push(clonedArr[i + 1][j - 1]);
		// if (clonedArr[i + 1][j] !== undefined) neighbors.push(clonedArr[i + 1][j]);
		// if (clonedArr[i + 1][j + 1] !== undefined)
		// 	neighbors.push(clonedArr[i + 1][j + 1]);

		// if (clonedArr[i][j - 1] !== undefined) neighbors.push(clonedArr[i][j - 1]);
		// if (clonedArr[i][j + 1] !== undefined) neighbors.push(clonedArr[i][j + 1]);

		return neighbors;
	};

	// Resource Click Multiplier
	const handleResourceClick = () => {
		if (base) setGold((gold) => gold + 1 * clickMultiplier);
	};

	return (
		<div className="container">
			{startGame && (
				<header className="overview">
					<ul>
						<li>
							<img src={Gold} className="overview-icon" />
							<span>{`Gold: ${gold}`}</span>
						</li>
						<li>
							<img src={Income} className="overview-icon" />
							<span>{`Income: ${income}`}</span>
						</li>
						<li>
							<img src={Land} className="overview-icon" />
							<span>{`Land: ${land}`}</span>
						</li>
						<li>
							<img src={Food} className="overview-icon" />
							<span>{`Food: ${food}`}</span>
						</li>
						<li>
							<img src={Stone} className="overview-icon" />
							<span>{`Stone: ${stone}`}</span>
						</li>
						<li>
							<img src={Combat} className="overview-icon" />
							<span>{`Combat: ${combat}`}</span>
						</li>
					</ul>
				</header>
			)}
			{startGame && (
				<div className="resource-click-container">
					<div className="resource-description">{`Multiplier: ${clickMultiplier}x`}</div>
					<button className="resource-click" onClick={handleResourceClick}>
						<span>Gold!</span>
					</button>
				</div>
			)}

			{!startGame && (
				<button className={'start-button'} onClick={handleStartGame}>
					Start Game
				</button>
			)}
			{startGame && (
				<ul className="board">
					{board.map((row, i) => {
						return row.map((tile, j) => {
							return tileCreationFactory(tile);
						});
					})}
				</ul>
			)}
		</div>
	);
}
