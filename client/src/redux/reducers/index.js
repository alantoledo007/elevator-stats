import { combineReducers } from 'redux';
import requests from './requests';
import elevators from './elevators';

const reducers = combineReducers({
    requests,
    elevators
})

export default reducers;