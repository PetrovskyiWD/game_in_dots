const baseUrl = 'https://starnavi-frontend-test-task.herokuapp.com';

const get = url => fetch(`${baseUrl}${url}`).then(res => res.json());
const post = (url, data) => fetch(`${baseUrl}${url}`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json;charset=utf-8'
		},
		body: JSON.stringify(data),
	}).then(res => res.json());

export default {
	get,
	post,
};