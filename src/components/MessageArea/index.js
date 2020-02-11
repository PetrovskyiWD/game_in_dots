import React from 'react';
import { useStoreState } from 'easy-peasy';

import { DEFAULT_MESSAGE } from '@constants';

import './style.scss';

const MessageArea = () => {
	const { isStart, winner, gameSettings } = useStoreState(state => state.game);

	if (!gameSettings) return null;

	return (
		<div className='message_area'>
			{!isStart && !winner && DEFAULT_MESSAGE}
			{winner && `${winner} won!`}
		</div>
	);
};

export default MessageArea;
