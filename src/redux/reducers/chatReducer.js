import * as actions from '../actionTypes';

const INITIAL_STATE = {
   conversations: [],
   conversationId: false,
   messages: [
      { messages: [
         { userId: false}
      ] }
   ],
   chatUser: [
      {
         photoUrl: false,
         username: false
      }
   ]
};


export const chatReducer = (prevState = INITIAL_STATE, action) => {
   const transState = JSON.parse(JSON.stringify(prevState));

   switch(action.type) {
      case actions.GET_CONVERSATIONS:
         return {...transState, conversations: action.payload}; //Conversations in existance
      case actions.CONVERSATION_ID:
         return {...transState, conversationId: action.payload}; //Conversation's id
      case actions.GET_MESSAGES:
         return {...transState, messages: action.payload}; //Messages from a conversation
      case actions.CHAT_USER:
         return {...transState, chatUser: action.payload}; //User chatting with the userApp
      default:
         return prevState;
   }
};
