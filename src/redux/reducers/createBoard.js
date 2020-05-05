const createBoard = (state = 0, action) => {
	switch (action.type) {
		case 'CREATE_BOARD':
			return (state = 1);
	}
};

export default createBoard;
