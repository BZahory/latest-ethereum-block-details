import { combineReducers } from 'redux';
import ethereumBlockDataReducer from 'slices/ethereum-block-data/reducer';

const rootReducer = combineReducers({ ethereumBlockDataReducer });

export default rootReducer;
