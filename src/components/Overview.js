import React from 'react';
import Gold from '../images/gold-bar.png';
import Income from '../images/income.png';
import Land from '../images/land.png';
import Stone from '../images/stone.png';
import Food from '../images/food.png';
import Combat from '../images/combat.png';

const Overview = React.forwardRef((props, ref) => {
	console.log(ref);
	const { gold, land, income, food, stone, combat } = ref;
	return (
		<ul className="overview">
			<li>
				<img src={Gold} className="overview-icon" />
				{`Gold: ${gold.current}`}
			</li>
			<li>
				<img src={Income} className="overview-icon" />
				{`Income: ${income.current}`}
			</li>
			<li>
				<img src={Land} className="overview-icon" />
				{`Land: ${land.current}`}
			</li>
			<li>
				<img src={Food} className="overview-icon" />
				{`Food: ${food.current}`}
			</li>
			<li>
				<img src={Stone} className="overview-icon" />
				{`Stone: ${stone.current}`}
			</li>
			<li>
				<img src={Combat} className="overview-icon" />
				{`Combat: ${combat.current}`}
			</li>
		</ul>
	);
});

export default Overview;
