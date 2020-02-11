import React, { useEffect, useCallback } from 'react';
import { useStoreState, useStoreActions } from 'easy-peasy';

import { useForm } from '@hooks/useForm';

import Select from './Select';
import TextField from './TextField';
import Button from './Button';

import './style.scss';

const validate = values => {
	const errors = {};
	const requiredFields = ['game_mode', 'player_name'];

	requiredFields.forEach(field => {
		if (!values[field] || !values[field].trim().length) errors[field] = true;
 	});

	return errors;
};

const GameForm = () => {
	const { fetchGameSettings, setGameMode, setStartGame } = useStoreActions(actions => actions.game);
	const { isStart, gameSettings, winner } = useStoreState(state => state.game);
	const {
		values: { game_mode, player_name },
		errors,
		handleSubmit,
		handleChange
	} = useForm(useCallback(values => !isStart && setStartGame({
		isStart: true,
		player: { name: values.player_name, points: 0 }
	}), [isStart, setStartGame]), validate);
	const gameModesOptions = [];

	useEffect(() => {
		fetchGameSettings();
	}, [fetchGameSettings]);

	useEffect(() => {
		if (game_mode) setGameMode(game_mode);
	}, [game_mode, setGameMode]);

	for (let setting in gameSettings) {
		gameModesOptions.push(setting);
	}

	if (!gameSettings) return <span>Loading game settings...</span>;

	return (
		<div>
			<form onSubmit={handleSubmit}>
				<Select
					name="game_mode"
					value={game_mode}
					options={gameModesOptions}
					onChange={e => !isStart && handleChange(e)}
					error={errors.game_mode}
					placeholder="Pick game mode"
					disabled={isStart}
				/>
				<TextField
					name="player_name"
					value={player_name}
					onChange={handleChange}
					placeholder="Enter your name"
					error={errors.player_name}
					disabled={isStart}
				/>
				<Button disabled={!game_mode || !player_name || isStart}>
					{winner ? 'Play again' : 'Play'}
				</Button>
			</form>
		</div>
	);
};

export default GameForm;
