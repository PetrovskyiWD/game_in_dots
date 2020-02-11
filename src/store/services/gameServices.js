import request from '@utils/request';

export const getGameSettings = () => request.get('/game-settings');