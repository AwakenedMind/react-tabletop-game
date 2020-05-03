import React, { useRef, useEffect } from 'react';
import Tile from './Tile';

const Board = React.memo(({ board, handleClick, memoArr }) => {
	const createFarm = (i) => {
		// setFarms(farms + 1);
		return (
			<Tile
				type={'Farm'}
				handleClick={handleClick}
				amount={150}
				ref={(el) => (tileRefs.current[i] = el)}
			/>
		);
	};
	const createMegaFarm = (i) => {
		// setMegaFarms(megaFarms + 1);

		return (
			<Tile
				type={'MegaFarm'}
				handleClick={handleClick}
				amount={650}
				ref={(el) => (tileRefs.current[i] = el)}
			/>
		);
	};

	const createWolf = (i) => {
		// setWolves(wolves + 1);

		return (
			<Tile
				type={'Wolf'}
				handleClick={handleClick}
				amount={1000}
				ref={(el) => (tileRefs.current[i] = el)}
			/>
		);
	};
	const createAlphaWolf = (i) => {
		// setAlphaWolf(alphaWolf + 1);
		return (
			<Tile
				type={'AlphaWolf'}
				handleClick={handleClick}
				amount={5000}
				ref={(el) => (tileRefs.current[i] = el)}
			/>
		);
	};

	const createStoneMine = (i) => {
		// setStoneMines(stoneMines + 1);
		return (
			<Tile
				type={'StoneMine'}
				handleClick={handleClick}
				amount={400}
				ref={(el) => (tileRefs.current[i] = el)}
			/>
		);
	};

	const createMegaStoneMine = (i) => {
		// setMegaStoneMines(megaStoneMines + 1);
		return (
			<Tile
				type={'Farm'}
				handleClick={handleClick}
				amount={2000}
				ref={(el) => (tileRefs.current[i] = el)}
			/>
		);
	};

	const createEmptyTile = (i) => {
		// setEmptyTile(emptyTile + 1);
		return (
			<Tile
				type={'Empty'}
				handleClick={handleClick}
				amount={100}
				ref={(el) => (tileRefs.current[i] = el)}
			/>
		);
	};
	const createMountain = (i) => {
		// setMountain(mountain + 1);
		return (
			<Tile
				type={'Mountain'}
				handleClick={handleClick}
				amount={150}
				ref={(el) => (tileRefs.current[i] = el)}
			/>
		);
	};

	// create tile refs for mutation otherwise tiles will keep re-rendering
	const tileRefs = useRef([]);

	useEffect(() => {
		tileRefs.current = tileRefs.current.slice(0, board.length);
	}, [board]);

	let count = 0;

	return (
		<ul className="board">
			{board.map((row) => {
				count = count + 1;
				return row.map((tile) => {
					if (tile === 0) return createEmptyTile(count);
					if (tile === 1) return createFarm(count);
					if (tile === 2) return createMegaFarm(count);
					if (tile === 3) return createStoneMine(count);
					if (tile === 4) return createMegaStoneMine(count);
					if (tile === 5) return createWolf(count);
					if (tile === 6) return createAlphaWolf(count);
					if (tile === 7) return createMountain(count);
				});
			})}
		</ul>
	);
});

export default Board;
