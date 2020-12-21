import { GET_CONTACTS } from '../actionTypes';

const INITIAL_STATE = [];

export const contactsReducer = (prevState = INITIAL_STATE, action) => {
   switch(action.type) {
      case GET_CONTACTS:
         return action.payload; //Arreglo de contactos que se recibe del fetch
      default:
         return prevState;
   }
}
