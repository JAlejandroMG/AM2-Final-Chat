import * as actions from '../actionTypes';

const INITIAL_STATE = {
   conversations: [],
   messages: [
      { messages: [
         { userId: false}
      ] }
   ]
}


export const chatReducer = (prevState = INITIAL_STATE, action) => {
   const transState = JSON.parse(JSON.stringify(prevState));

   switch(action.type) {
      case actions.GET_CONVERSATIONS:
         return {...transState, conversations: action.payload}; //Conversations in existance
      case actions.GET_MESSAGES:
         return {...transState, messages: action.payload}; //Messages from a conversation
      default:
         return prevState;
   }
};
