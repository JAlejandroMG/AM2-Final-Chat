import * as actions from '../actionTypes';

const INITIAL_STATE = {
   contacts: [],
   userApp: [
      { _id: false }
   ]
}

export const contactsReducer = (prevState = INITIAL_STATE, action) => {
   const transState = JSON.parse(JSON.stringify(prevState));

   switch(action.type) {
      case actions.GET_CONTACTS:
         return {...transState, contacts: action.payload}; //Arreglo de contactos que se recibe del fetch
      case actions.GET_USERAPP:
         return {...transState, userApp: action.payload} // Usuario conectado a la app
      default:
         return prevState;
   }
};
