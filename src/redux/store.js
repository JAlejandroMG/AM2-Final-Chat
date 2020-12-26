import { createStore, combineReducers, applyMiddleware } from "redux";
import { authReducer } from './reducers/authReducer';
import { chatReducer } from './reducers/chatReducer';
import { contactsReducer } from './reducers/contactsReducer';
import logger from 'redux-logger';
import thunk from 'redux-thunk';

const rootReducer = combineReducers({ auth: authReducer, chat: chatReducer, contacts: contactsReducer });

const store = createStore(rootReducer, applyMiddleware(logger, thunk));

export default store;
