import { createStore, combineReducers, applyMiddleware } from "redux";
import { contactsReducer } from './reducers/contactsReducer';
import logger from 'redux-logger';
import thunk from 'redux-thunk';

const rootReducer = combineReducers({ contacts: contactsReducer });

const store = createStore(rootReducer, applyMiddleware(logger, thunk));

export default store;
