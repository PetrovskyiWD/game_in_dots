import { thunk, thunkOn, action, actionOn } from 'easy-peasy';

import { BLUE, RED, GREEN, COMPUTER_NAME } from '@constants';
import { getGameSettings } from '../services/gameServices';

let randomTimer = null;
let timer = null;

const gameModel = {
	// State
	isStart: false,
	gameSettings: null,
	gameMode: null,
	fields: [],
	chosenItemId: null,
	player: {
		points: 0,
	},
	computer: {
		name: COMPUTER_NAME,
		points: 0,
	},
	winner: null,
	// Action
	setStartGame: action((state, payload) => {
		Object.assign(state, { ...payload, computer: { ...state.computer, points: 0 }, winner: null });
	}),
	setGameSettings: action((state, payload) => {
		Object.assign(state, { gameSettings: payload });
	}),
	setGameMode: action((state, payload) => {
		const gameMode = state.gameSettings[payload];

		Object.assign(state, { gameMode });
	}),
	setItemColor: action((state, payload) => {
		const newFields = state.fields.map(item => ({
			...item,
			[payload.color]: item[payload.color] ? item[payload.color] :  item.id === payload.id
		}));

		Object.assign(state, { fields: newFields });
	}),
	setPointTo: action((state, payload) => {
		Object.assign(state, { [payload]: { ...state[payload], points: state[payload].points + 1 } });
	}),
	checkWinner: action(state => {
		if (state.computer.points / state.fields.length * 100 >= 50) {
			Object.assign(state, { isStart: false, winner: state.computer.name });
			clearTimeout(randomTimer);
		} else if (state.player.points / state.fields.length * 100 >= 50) {
			Object.assign(state, { isStart: false, winner: state.player.name });
			clearTimeout(randomTimer);
		} else
			return false
	}),
	chooseRandomItem: action((state, payload) => {
		Object.assign(state, { chosenItemId: payload })
	}),
	// Action On
	setFields: actionOn(
		actions => [actions.setGameMode, actions.setStartGame],
		state => {
		const fields = [];

		for (let i = 0; i < state.gameMode.field; i++) {
			for (let j = 1; j <= state.gameMode.field; j++) {
				fields.push({
					id: i === 0 ? i+j : (i * state.gameMode.field) + j,
					[BLUE]: false,
					[RED]: false,
					[GREEN]: false,
				});
			}
		}

		Object.assign(state, { fields });
	}),
	// Thunk
	fetchGameSettings: thunk(async actions => {
		const data = await getGameSettings();

		actions.setGameSettings(data);
	}),
	// Thunk On
	onStartGame: thunkOn(
		actions => actions.setStartGame,
		(actions, target, helpers) => {
			const { fields, gameMode } = helpers.getState();
			const randomItem = fields[Math.floor(Math.random() * fields.length)];

			setTimeout(() => {
				actions.chooseRandomItem(randomItem.id);
			}, gameMode.delay)
		}
	),
	onChooseRandomItem: thunkOn(
		actions => actions.chooseRandomItem,
		async (actions, target, helpers) => {
			const { payload } = target;
			const { fields, gameMode, chosenItemId } = helpers.getState();
			const unChosenFields = fields.filter(item => item[BLUE] === false && item.id !== chosenItemId);
			const randomItem = unChosenFields[Math.floor(Math.random() * unChosenFields.length)];

			await actions.setItemColor({ id: payload, color: BLUE });

			randomTimer = setTimeout(() => {
				actions.chooseRandomItem(randomItem.id);
			}, gameMode.delay);
		}
	),
	onSetItemColor: thunkOn(
		actions => actions.setItemColor,
		(actions, target, helpers) => {
			const { payload } = target;
			const { chosenItemId, gameMode } = helpers.getState();

			switch (payload.color) {
				case GREEN:
					actions.setPointTo('player');
					clearTimeout(timer);
					break;
				case BLUE:
					timer = setTimeout(() => {
						actions.setItemColor({ id: chosenItemId, color: RED });
					}, gameMode.delay);
					break;
				case RED:
					actions.setPointTo('computer');
					break;
				default:
					clearTimeout(timer);
			}

			actions.checkWinner();
		}
	)
};

export default gameModel;