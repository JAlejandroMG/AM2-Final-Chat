import { createStore, combineReducers, applyMiddleware } from "redux";
import { authReducer } from './reducers/authReducer';
import { contactsReducer } from './reducers/contactsReducer';
import logger from 'redux-logger';
import thunk from 'redux-thunk';

const rootReducer = combineReducers({ contacts: contactsReducer, auth: authReducer });

const store = createStore(rootReducer, applyMiddleware(logger, thunk));

export default store;
