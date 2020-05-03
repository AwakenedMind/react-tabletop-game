import React, { useRef, useEffect, forwardRef } from 'react';
import Tile from './Tile';

const Board = React.forwardRef(({ board }, ref) => {
	console.log(ref);
	console.log(ref.gold.current);

	// const dataRef = useRef(ref);

	// Updates gold and land when player clicks a tile
	const handleClick = (amount) => {
		console.log('handleClick() ran');
		console.log(ref.gold.current);
		if (ref.gold.current >= amount) {
			ref.gold.current = ref.gold.current - amount;
			ref.land.current = ref.land.current + 1;
		}
	};

	const createFarm = (i, j) => {
		// setFarms(farms + 1);
		return (
			<Tile
				key={`[${i},${j}]`}
				type={'Farm'}
				amount={150}
				// ref={(el) => (tileRefs.current[i] = el)}
				ref={tileRefs}
			/>
		);
	};
	const createMegaFarm = (i, j) => {
		// setMegaFarms(megaFarms + 1);

		return (
			<Tile
				key={`[${i},${j}]`}
				type={'MegaFarm'}
				amount={650}
				// ref={(el) => (tileRefs.current[i] = el)}
				ref={tileRefs}
			/>
		);
	};

	const createWolf = (i, j) => {
		// setWolves(wolves + 1);

		return (
			<Tile
				key={`[${i},${j}]`}
				type={'Wolf'}
				amount={1000}
				// ref={(el) => (tileRefs.current[i] = el)}
				ref={tileRefs}
			/>
		);
	};
	const createAlphaWolf = (i, j) => {
		// setAlphaWolf(alphaWolf + 1);
		return (
			<Tile
				key={`[${i},${j}]`}
				type={'AlphaWolf'}
				amount={5000}
				// ref={(el) => (tileRefs.current[i] = el)}
				ref={tileRefs}
			/>
		);
	};

	const createStoneMine = (i, j) => {
		// setStoneMines(stoneMines + 1);
		return (
			<Tile
				key={`[${i},${j}]`}
				type={'StoneMine'}
				amount={400}
				// ref={(el) => (tileRefs.current[i] = el)}
				ref={tileRefs}
			/>
		);
	};

	const createMegaStoneMine = (i, j) => {
		// setMegaStoneMines(megaStoneMines + 1);
		return (
			<Tile
				key={`[${i},${j}]`}
				type={'MegaStoneMine'}
				amount={2000}
				// ref={(el) => (tileRefs.current[i] = el)}
				ref={tileRefs}
			/>
		);
	};

	const createEmptyTile = (i, j) => {
		// setEmptyTile(emptyTile + 1);
		return (
			<Tile
				key={`[${i},${j}]`}
				type={'Empty'}
				amount={100}
				// ref={(el) => (tileRefs.current[i] = el)}
				ref={tileRefs}
			/>
		);
	};
	const createMountain = (i, j) => {
		// setMountain(mountain + 1);
		return (
			<Tile
				key={`[${i},${j}]`}
				type={'Mountain'}
				amount={500}
				// ref={(el) => (tileRefs.current[i] = el)}
				ref={tileRefs}
			/>
		);
	};

	// create tile refs for mutation otherwise tiles will keep re-rendering
	const tileRefs = useRef({
		data: ref,
		handleClick: handleClick,
	});

	// useEffect(() => {
	// 	// tileRefs.current = tileRefs.current.slice(0, board.length);
	// 	tileRefs.current = {
	// 		// num: tileRefs.current.slice(0, board.length),
	// 		data: ref,
	// 		handleClick: handleClick,
	// 	};
	// }, [board]);

	let count = 0;

	return (
		<ul className="board">
			{board.map((row, i) => {
				count = count + 1;
				return row.map((tile, j) => {
					if (tile === 0) return createEmptyTile(i, j);
					if (tile === 1) return createFarm(i, j);
					if (tile === 2) return createMegaFarm(i, j);
					if (tile === 3) return createStoneMine(i, j);
					if (tile === 4) return createMegaStoneMine(i, j);
					if (tile === 5) return createWolf(i, j);
					if (tile === 6) return createAlphaWolf(i, j);
					if (tile === 7) return createMountain(i, j);
				});
			})}
		</ul>
	);
});

export default Board;
