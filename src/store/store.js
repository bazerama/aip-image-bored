import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers/rootReducer';

/**
 * This store function is pretty much boilerplate and is a combination of the
 * default code from Redux guide itself: https://redux.js.org/recipes/configuring-your-store
 * and redux-devtools guide: https://github.com/zalmoxisus/redux-devtools-extension#12-advanced-store-setup
 *
 * The thunk middleware is 'syntax sugar' (the dispatch => {} in actions) in addition to it helping
 * with side effect logic and asynchronous store calls. Although it's probably overkill, it will help
 * in both understanding Redux store + thunk and also keeping the website scalable!
 */

const storeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(rootReducer, storeEnhancers(applyMiddleware(thunk)));

export default store;
