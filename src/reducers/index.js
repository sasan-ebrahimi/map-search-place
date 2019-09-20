import {combineReducers} from 'redux';
import SearchReducer from './SearchReducer';
/**
 * Provides a combineReducers
 */
export default combineReducers({
    search:SearchReducer
})