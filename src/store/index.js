import { createStore } from 'easy-peasy';
import devToolsEnhancer from 'remote-redux-devtools';

import storeModel from './models';

const store = createStore(storeModel, devToolsEnhancer());

export default store;