import request from '@utils/request';

export const getLeaders = () => request.get('/winners');
export const sendWinner = data => request.post('/winners', data);