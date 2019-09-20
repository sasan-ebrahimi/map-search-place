import {createStore, applyMiddleware} from 'redux';
import {persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web and AsyncStorage for react-native
import reducer from '../reducers';
import ReduxThunk from 'redux-thunk';

/**
 * Configuration of redux persist to keep store state persisted if needed
 * @type {{key: string, storage: module:redux-persist/es/types.WebStorage, blacklist: string[]}}
 */
const persistConfig = {
    key: 'root',
    storage,
    blacklist:['search']
};

/**
 * make a persisted reducer
 */
const persistedReducer = persistReducer(persistConfig, reducer);

/**
 * Create the store
 * @type {Store<any, Action> & {dispatch: any}}
 */
const store = createStore(persistedReducer, {} , applyMiddleware(ReduxThunk));
const persistor = persistStore(store);

export {store, persistor};

