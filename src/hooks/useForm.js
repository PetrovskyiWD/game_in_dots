import { useEffect, useState } from 'react';

export const useForm = (callback, validate, initialValues = {}) => {
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [values, setValues] = useState(initialValues);
	const [errors, setErrors] = useState({});

	useEffect(() => {
		if (!Object.keys(errors).length && isSubmitting) {
			callback(values);
			setIsSubmitting(false);
		}
	}, [values, errors, isSubmitting, callback]);

	const handleSubmit = e => {
		if (e) e.preventDefault();

		setErrors(validate(values));
		setIsSubmitting(true);
	};

	const handleChange = e => {
		e.persist();

		setValues(values => ({ ...values, [e.target.name]: e.target.value }))
	};

	return {
		values,
		errors,
		handleSubmit,
		handleChange,
	}
};