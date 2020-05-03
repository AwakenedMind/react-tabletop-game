import React, { forwardRef } from 'react';
import AlphaWolf from '../images/alpha-wolf-colored.png';
import Wolf from '../images/wolf-colored.png';
import Farm from '../images/farm-colored.png';
import MegaFarm from '../images/mega-farm-colored.png';
import StoneMine from '../images/stone-mine-colored.png';
import MegaStoneMine from '../images/mega-stone-mine-colored.png';
import Mountain from '../images/mountain-colored.png';

const images = {
	Mountain: Mountain,
	Wolf: Wolf,
	AlphaWolf: AlphaWolf,
	Empty: null,
	StoneMine: StoneMine,
	MegaStoneMine: MegaStoneMine,
	MegaFarm: MegaFarm,
	Farm: Farm,
};

const Tile = React.forwardRef(({ type, amount }, ref) => {
	console.log(ref);
	// console.log('tile created');

	// Updates gold and land when player clicks a tile
	const handleClick = (amount) => {
		// console.log('handleClick() ran');
		console.log(ref.current.data.gold.current);
		if (ref.current.data.gold.current >= amount) {
			ref.current.data.gold.current = ref.current.data.gold.current - amount;
			ref.current.data.land.current = ref.current.data.land.current + 1;
		}
	};

	return (
		<li className="tile" onClick={() => handleClick(amount)}>
			{amount}
			{type !== 'Empty' ? (
				<img src={images[type]} className="tile-icon" />
			) : null}
		</li>
	);
});

export default Tile;
