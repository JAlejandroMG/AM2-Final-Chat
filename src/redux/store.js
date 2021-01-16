import { createStore, combineReducers, applyMiddleware } from "redux";
import { composeWithDevTools } from 'redux-devtools-extension';
import { authReducer } from './reducers/authReducer';
import { chatReducer } from './reducers/chatReducer';
import { contactsReducer } from './reducers/contactsReducer';
import { loaderReducer } from './reducers/loaderReducer';
import logger from 'redux-logger';
import thunk from 'redux-thunk';

const rootReducer = combineReducers({ auth: authReducer, chat: chatReducer, contacts: contactsReducer, loader: loaderReducer });

const store = createStore( rootReducer, composeWithDevTools( applyMiddleware(logger, thunk) ) );

export default store;
