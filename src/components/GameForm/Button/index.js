import React from 'react';
import classNames from 'classnames';

import './style.scss';

const Button = ({ children, disabled }) => {
	return (
		<div>
			<button className={classNames({ disabled })} type="submit" disabled={disabled}>
				{children}
			</button>
		</div>
	);
};

export default Button;
