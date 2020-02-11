import { action, thunk } from 'easy-peasy';

import { getLeaders, sendWinner } from '../services/leaderBoardServices';

const leaderBoardModel = {
	// State
	loading: true,
	leaders: [],
	// Action
	setLeaders: action((state, payload) => {
		const leaders = [];

		for (let i = payload.length - 1; i >= payload.length - 4; i--) {
			leaders.push({
				...payload[i]
			});
		}

		Object.assign(state, { leaders, loading: false })
	}),
	// Thunk
	fetchLeaders: thunk(async actions => {
		const data = await getLeaders();

		actions.setLeaders(data);
	}),
	sendingWinner: thunk(async (actions, payload) => {
		const data = await sendWinner(payload);

		actions.setLeaders(data);
	}),
};

export default leaderBoardModel;