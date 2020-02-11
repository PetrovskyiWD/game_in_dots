import React from 'react';
import classNames from 'classnames';

const Item = ({ id, blue, red, green, size, onClick }) => {
	return (
		<div
			id={id}
			className={classNames('item', { blue, red, green })}
			style={{ width: size, height: size }}
			onClick={onClick}
		/>
	);
};

export default Item;
