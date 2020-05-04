import React, { useState, useEffect, useRef } from 'react';
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

import Bought from './images/bought.png';

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
	const [stone, setStone] = useState(1000);
	const [combat, setCombat] = useState(50);
	const [food, setFood] = useState(100);
	const [land, setLand] = useState(0);
	const [base, setBase] = useState(false);

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
						stone: 50,
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
						combat: 150,
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
	};

	// create the game board if the user has clicked to start the game
	useEffect(() => {
		!startGame && createGameBoard();
	}, []);

	// start the game
	const handleStartGame = () => setStartGame(true);

	// Create tiles depending on the data passed in
	const tileCreationFactory = (data) => {
		let isBought = data.isBought;
		let isBase = data.isBase;
		let gold = data.cost.gold;
		let image = data.image;

		return (
			<li
				className={
					data.isBought
						? isBase
							? ' tile-is-bought base'
							: 'tile-is-bought'
						: 'tile'
				}
				key={`[${data.i},${data.j}]`}
				onClick={() => handleClick(data)}
			>
				{data.isBought ? isBase ? 'B' : <span>{'Owned'}</span> : data.cost.gold}
				{data.type !== 'Empty' ? (
					<img src={data.image} className="tile-icon" />
				) : null}
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
		)
			purchaseBase(data);

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
		let goldAmount = 100;
		let stoneAmount = 1000;
		let combatAmount = 0;

		checkResources(goldAmount, stoneAmount, combatAmount);

		setBase(true);

		setBoard((prevBoard) => {
			prevBoard[data.i].splice(data.j, 1, {
				...data,
				...updateIsBought(data),
				...updateIsBase(data),
			});
			return prevBoard;
		});
	};

	// Update Tiles / Resources Functions
	const updateGold = (cost) => setGold((gold) => gold - cost);
	const updateLand = () => setLand((land) => land + 1);
	const updateStone = (cost) => setStone((stone) => stone - cost);
	const updateCombat = (cost) => setCombat(combat);

	// Update isBought: true
	const updateIsBought = (data) => Object.assign(data, { isBought: true });
	const updateIsBase = (data) => Object.assign(data, { isBase: true });

	const checkResources = (goldCost, stoneCost, combatCost) => {
		if (goldCost > 0) updateGold(goldCost);
		if (stoneCost > 0) updateStone(stoneCost);
		if (combatCost > 0) updateCombat(combatCost);
	};

	// Update Tile
	const updateTile = (data) => {
		// Subtract resources depending on the amount of the tile
		checkResources(data.cost.gold, data.cost.stone, data.cost.combat);

		// complete ownership of tile
		updateLand();
		setBoard((prevBoard) => {
			prevBoard[data.i].splice(data.j, 1, { ...data, ...updateIsBought(data) });
			return prevBoard;
		});
	};

	return (
		<div className="container">
			{startGame && (
				<ul className="overview">
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
