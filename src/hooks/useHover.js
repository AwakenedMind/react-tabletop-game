// https://usehooks.com/useHover/

import { useRef, useState, useEffect } from 'react';
export default function useHover() {
	const [value, setValue] = useState(false);
	const [time, setTime] = useState(null);

	// Wrap in useCallback so we can use in dependencies below
	const handleMouseOver = () => {
		setTime(setTimeout(setValue(true), 3000));
	};

	const handleMouseOut = () => {
		clearTimeout(time);
		setValue(false);
	};

	// Keep track of the last node passed to callbackRef
	// so we can remove its event listeners.
	const ref = useRef(null);

	// Use a callback ref instead of useEffect so that event listeners
	// get changed in the case that the returned ref gets added to
	// a different element later. With useEffect, changes to ref.current
	// wouldn't cause a rerender and thus the effect would run again.
	useEffect(
		() => {
			const node = ref.current;

			if (node) {
				node.addEventListener('mouseover', handleMouseOver);

				node.addEventListener('mouseout', handleMouseOut);

				return () => {
					node.removeEventListener('mouseover', handleMouseOver);

					node.removeEventListener('mouseout', handleMouseOut);
				};
			}
		},

		[ref.current] // Recall only if ref changes
	);

	return [ref, value];
}
