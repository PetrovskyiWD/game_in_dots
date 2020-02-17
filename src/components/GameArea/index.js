import React, { useCallback } from 'react';
import { useStoreActions, useStoreState } from 'easy-peasy';

import { BLUE, RED, GREEN } from '@constants';

import Item from './Item';

import './style.scss';

const windowWidth = window.innerWidth;
const filedWidth = windowWidth >= 768 ? 35 : 20;

const GameArea = () => {
	const { setItemColor } = useStoreActions(actions => actions.game);
	const { isStart, fields, gameMode } = useStoreState(state => state.game);

	const handleClick = useCallback(e => {
		const id = e.target.id;
		const item = fields.find(item => item.id === +id);

		if (isStart && item[BLUE] && !item[RED] && !item[GREEN]) setItemColor({ id: item.id, color: GREEN });
	}, [isStart, fields, setItemColor]);

	return (
		<div className="game_area">
			{!!fields.length &&
				Array.from(Array(gameMode.field).keys()).map((fieldNumber) => {
					const sliceStart = fieldNumber === 0 ? fieldNumber : fieldNumber * gameMode.field;
					const sliceEnd = (fieldNumber + 1) * gameMode.field;
					const fieldItems = fields.slice(sliceStart, sliceEnd);

					return (
						<div key={fieldNumber}
						     className="column"
						     style={{ width: filedWidth * gameMode.field }}
						>
							{
								fieldItems.map(item =>
									<Item
										key={item.id} size={filedWidth}
										{...item}
										onClick={handleClick}
									/>
								)
							}
						</div>
					)
				})
			}
		</div>
	);
};

export default GameArea;
