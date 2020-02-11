import React from 'react';

import './style.scss';

const Select = ({ name, options, error, placeholder, disabled, onChange }) => {
	return (
		<div className="form_field">
			<select name={name} defaultValue="" onChange={onChange} disabled={disabled}>
				{placeholder && (
					<option
						className="hidden"
						value=""
						disabled
					>
						{placeholder}
					</option>
				)}
				{options.map(item => (
					<option key={item} value={item}>
						{item}
					</option>
				))}
			</select>
			{error && <span className="error">This field is required</span>}
		</div>
	);
};

export default Select;
