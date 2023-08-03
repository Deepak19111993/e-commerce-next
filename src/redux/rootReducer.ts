import { combineReducers } from 'redux';
import counterReducer from './userData/reducer';

export default combineReducers({
  counterReducer,
});
