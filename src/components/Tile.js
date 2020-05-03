import React, { forwardRef } from 'react';
import AlphaWolf from '../images/alpha-wolf.png';
import Wolf from '../images/wolf.png';
import Farm from '../images/farm.png';
import MegaFarm from '../images/mega-farm.png';
import StoneMine from '../images/stone-mine.png';
import MegaStoneMine from '../images/mega-stone-mine.png';
import Mountain from '../images/mountain.png';

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

const Tile = ({ type, handleClick, amount, ref }) => {
	console.log('tile created');
	console.log(ref);
	return (
		<li className="tile" ref={ref} onClick={() => handleClick(amount)}>
			{amount}
			{type !== 'Empty' ? (
				<img src={images[type]} className="tile-icon" />
			) : null}
		</li>
	);
};

export default React.memo(forwardRef(Tile));
