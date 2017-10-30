import { combineReducers } from 'redux';
import users from './users'

const meanApp = combineReducers({
    users
});

export default meanApp;