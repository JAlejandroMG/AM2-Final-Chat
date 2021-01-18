import * as actions from '../actionTypes';



const INITIAL_STATE = {
   contacts: [],
   userApp: [
      { _id: false }
   ]
};



export const contactsReducer = (prevState = INITIAL_STATE, action) => {
   const transState = JSON.parse(JSON.stringify(prevState));

   switch(action.type) {
      case actions.GET_CONTACTS:
         return {...transState, contacts: action.payload}; //Users to have a conversation with

      case actions.GET_USERAPP:
         return {...transState, userApp: action.payload}; //User connected to the App

      case actions.RESET_CONTACTS_REDUCER:
         return {
            contacts: [],
            userApp: [
               { _id: false }
            ]
         };

      default:
         return prevState;
   }
};
