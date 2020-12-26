import * as actions from '../actionTypes';

// const INITIAL_STATE = [];
const INITIAL_STATE = {
   conversations: [],
   messages: [
      { messages: [
         { userId: false}
      ] }
   ]
}
// messages[0].messages[0].userId


export const chatReducer = (prevState = INITIAL_STATE, action) => {
   const transState = JSON.parse(JSON.stringify(prevState));

   switch(action.type) {
      case actions.GET_CONVERSATIONS:
         // return action.payload; //Arreglo de contactos que se recibe del fetch
         return {...transState, conversations: action.payload};
      case actions.GET_MESSAGES:
         // return action.payload; //Arreglo de mensajes que se recibe del fetch
         return {...transState, messages: action.payload};
      default:
         return prevState;
   }
};
