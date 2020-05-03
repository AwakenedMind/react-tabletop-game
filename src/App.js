import React, { useState, useEffect, useRef, useMemo } from 'react';
import './App.scss';
// import Food from './images/food.png';
// import Mountain from './images/summits.png';
// import useHover from './hooks/useHover';

// const images = {
// 	Mountain: Mountain,
// 	Wolf: Wolf,
// 	Empty: null,
// 	StoneMine: StoneMine,
// 	MegaStoneMine: MegaStoneMine,
// 	MegaFarm: MegaFarm,
// 	Farm: Farm,
// };

const Tile = React.memo(({ type, handleClick, amount }) => {
	console.log('tile created');
	return (
		<li className="tile" onClick={() => handleClick(amount)}>
			{amount}
			{/* <img src={Summits} className="summits" /> */}
			{/* {isHovered ? <div className="modal-hover">Hovering</div> : null} */}
		</li>
	);
	// return val === 1 ? (
	// 	<li className="tile" onClick={() => handleClick(amount)} ref={hoverRef}>
	// 		{amount}
	// 		<img src={Summits} className="summits" />
	// 		{/* {isHovered ? <div className="modal-hover">Hovering</div> : null} */}
	// 	</li>
	// ) : (
	// 	<li
	// 		className="empty-tile"
	// 		onClick={() => handleClick(amount)}
	// 		ref={hoverRef}
	// 	>
	// 		{amount}
	// 		{/* {isHovered ? <div className="modal-hover">Hovering</div> : null} */}
	// 	</li>
	// );
});

const Board = React.memo(({ board, handleClick, memoArr }) => {
	const [farms, setFarms] = useState(0);
	const [megaFarms, setMegaFarms] = useState(0);

	const [stoneMines, setStoneMines] = useState(0);
	const [megaStoneMines, setMegaStoneMines] = useState(0);

	const [wolves, setWolves] = useState(0);
	const [alphaWolf, setAlphaWolf] = useState(0);

	const [emptyTile, setEmptyTile] = useState(0);
	const [mountain, setMountain] = useState(0);

	const createRandomNum = () => Math.floor(Math.random() * 100) + 1;

	const createFarm = () => {
		// setFarms(farms + 1);
		return <Tile type={'Farm'} handleClick={handleClick} amount={150} />;
	};
	const createMegaFarm = () => {
		// setMegaFarms(megaFarms + 1);

		return <Tile type={'MegaFarm'} handleClick={handleClick} amount={650} />;
	};

	const createWolf = () => {
		// setWolves(wolves + 1);

		return <Tile type={'Wolf'} handleClick={handleClick} amount={1000} />;
	};
	const createAlphaWolf = () => {
		// setAlphaWolf(alphaWolf + 1);
		return <Tile type={'AlphaWolf'} handleClick={handleClick} amount={5000} />;
	};

	const createStoneMine = () => {
		// setStoneMines(stoneMines + 1);
		return <Tile type={'StoneMine'} handleClick={handleClick} amount={400} />;
	};

	const createMegaStoneMine = () => {
		// setMegaStoneMines(megaStoneMines + 1);
		return <Tile type={'Farm'} handleClick={handleClick} amount={2000} />;
	};

	const createEmptyTile = () => {
		// setEmptyTile(emptyTile + 1);
		return (
			<Tile type={'Empty'} handleClick={handleClick} amount={memoArr[count]} />
		);
	};
	const createMountain = () => {
		// setMountain(mountain + 1);
		return <Tile type={'Mountain'} handleClick={handleClick} amount={150} />;
	};

	const createTile = () => {
		let random = createRandomNum();

		// create an empty tile 50% of the time
		if (random >= 50) {
			return createEmptyTile();
		}

		// 40% chance 0-40
		else if (random < 50 && random > 40) {
			// 5% chance to create Mega Farm
			let megaChance = createRandomNum();
			if (megaChance <= 5) {
				return createMegaFarm();
			} else {
				return createFarm();
			}
		}

		// 19%
		else if (random > 20 && random <= 40) {
			// 5% chance to create Mega Oil Well
			let megaChance = createRandomNum();
			if (megaChance <= 5) {
				return createMegaStoneMine();
			} else {
				return createStoneMine();
			}
		}

		// 10%
		else if (random <= 20 && random > 9) {
			// 5% chance to create Alpha Wolf
			let megaChance = createRandomNum();
			if (megaChance <= 5) {
				return createAlphaWolf();
			} else {
				return createWolf();
			}
		} else {
			return createMountain();
		}
	};

	// keep global count to access array of 100 random values
	let count = 0;

	return (
		<ul className="board">
			{board.map((row, idx1) => {
				return row.map((tile) => {
					count = count + 1;

					let random = createRandomNum();

					// create an empty tile 50% of the time
					if (random >= 50) {
						return createEmptyTile();
					}

					// 40% chance 0-40
					else if (random < 50 && random > 40) {
						// 5% chance to create Mega Farm
						let megaChance = createRandomNum();
						if (megaChance <= 5) {
							return createMegaFarm();
						} else {
							return createFarm();
						}
					}

					// 19%
					else if (random > 20 && random <= 40) {
						// 5% chance to create Mega Oil Well
						let megaChance = createRandomNum();
						if (megaChance <= 5) {
							return createMegaStoneMine();
						} else {
							return createStoneMine();
						}
					}

					// 10%
					else if (random <= 20 && random > 9) {
						// 5% chance to create Alpha Wolf
						let megaChance = createRandomNum();
						if (megaChance <= 5) {
							return createAlphaWolf();
						} else {
							return createWolf();
						}
					} else {
						return createMountain();
					}
				});
			})}
		</ul>
	);
});

const generateRandom100 = () => {
	return Math.floor(Math.random() * 100) + 1;
};
// generate an array of 100 random values
let generate100 = () => {
	return Array.from({ length: 100 }, generateRandom100);
};

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

	const [gold, setGold] = useState(1000);
	const [income, setIncome] = useState(0);
	const [land, setLand] = useState(0);
	const [val, setVal] = useState(generate100());

	const handleClick = (amount) => {
		if (gold >= amount) {
			setGold((gold) => gold - amount);
			setLand((land) => land + 1);
		}
	};

	const increaseIncome = () => {
		setIncome((income) => income + 5);
	};

	useEffect(() => {
		if (land > 0) increaseIncome();
	}, [land]);

	function useInterval(callback, delay) {
		const savedCallback = useRef();

		// Remember the latest callback.
		useEffect(() => {
			savedCallback.current = callback;
		}, [callback]);

		// Set up the interval.
		useEffect(() => {
			function tick() {
				savedCallback.current();
			}
			if (delay !== null) {
				let id = setInterval(tick, delay);
				return () => clearInterval(id);
			}
		}, [delay]);
	}

	useInterval(() => {
		setGold((gold) => gold + income);
	}, 5000);

	return (
		<div className="container">
			<ul className="overview">
				<li>{`Gold: ${gold}`}</li>
				<li>{`Land: ${land}`}</li>
				<li>{`Income: ${income}`}</li>
			</ul>
			<Board
				board={board}
				className="board-container"
				handleClick={handleClick}
				memoArr={val}
			/>
		</div>
	);
}
