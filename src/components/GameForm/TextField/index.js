import React from 'react';

import './style.scss';

const TextField = ({ name, placeholder, error, disabled, onChange }) => {
	return (
		<div className="form_field">
			<input
				name={name}
				type="text"
				placeholder={placeholder}
				readOnly={disabled}
				onChange={onChange}
			/>
			{error && <span className="error">This field is required</span>}
		</div>
	);
};

export default TextField;
