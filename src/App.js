import React, { useState, useEffect, useRef, useMemo, useReducer } from 'react';
import './App.scss';
import Food from './images/food.png';
import Summits from './images/summits.png';
import useHover from './hooks/useHover';

const Tile = React.memo(({ val, handleClick, amount }) => {
	const [hoverRef, isHovered] = useHover();

	return val === 1 ? (
		<li className="tile" onClick={() => handleClick(amount)} ref={hoverRef}>
			{amount}
			<img src={Summits} className="summits" />
			{isHovered ? <div className="modal-hover">Hovering</div> : null}
		</li>
	) : (
		<li
			className="empty-tile"
			onClick={() => handleClick(amount)}
			ref={hoverRef}
		>
			{amount}
			{isHovered ? <div className="modal-hover">Hovering</div> : null}
		</li>
	);
});

const Board = React.memo(({ board, handleClick, memoArr }) => {
	const [farms, setFarms] = useState(0);
	const [oilWells, setOilWells] = useState(0);
	const [wolves, setWolves] = useState(0);

	const createFarm = () => {};

	const createWolf = () => {};

	const createOilWell = () => {};

	let count = 0;

	return (
		<ul className="board">
			{board.map((row, idx1) => {
				return row.map((tile) => {
					count = count + 1;
					if (tile === 1) {
						// return memoTile;
						return <Tile val={1} handleClick={handleClick} amount={2500} />;
					} else {
						// return memoEmptyTile;
						return (
							<Tile val={0} handleClick={handleClick} amount={memoArr[count]} />
						);
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
		[1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
		[1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
		[1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
		[1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
		[1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
		[1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
		[1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
		[1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
		[1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
		[1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
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

	const generateRandom100 = () => {
		return Math.floor(Math.random() * 100) + 1;
	};
	// generate an array of 100 random values
	// let generate100 = () => {
	// 	return Array.from({ length: 100 }, generateRandom100);
	// };
	// let memoizedArr = useMemo(() => generate100());

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
