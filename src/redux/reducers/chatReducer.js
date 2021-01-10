import * as actions from '../actionTypes';

const INITIAL_STATE = {
   chatUser: [
      {
         photoUrl: "https://st3.depositphotos.com/15648834/17930/v/600/depositphotos_179308454-stock-illustration-unknown-person-silhouette-glasses-profile.jpg",
         username: false
      }
   ],
   conversationId: false,
   conversations: [],
   messages: [
      {
         _id: false,
         messages: []
      }
   ],
   scrollChatBody: true
};


export const chatReducer = (prevState = INITIAL_STATE, action) => {
   const transState = JSON.parse(JSON.stringify(prevState));

   switch(action.type) {
      case actions.RESET_CHAT_REDUCER:
         return {
            conversations: [],
            conversationId: false,
            messages: [
               {
                  _id: false,
                  messages: []
               }
            ],
            chatUser: [
               {
                  photoUrl: "https://st3.depositphotos.com/15648834/17930/v/600/depositphotos_179308454-stock-illustration-unknown-person-silhouette-glasses-profile.jpg",
                  username: false
               }
            ]
         };
      case actions.GET_CONVERSATIONS:
         const addedPropertyConversations = [];
         const addedPropertyConversation = {conversationSelected: false};
         const conversationsObj = action.payload;
         conversationsObj.map(conversation => {
            const addingPropertyConversation = Object.assign(conversation, addedPropertyConversation);
            addedPropertyConversations.push(addingPropertyConversation);
            return true
         });
         return {...transState, conversations: addedPropertyConversations}; //Conversations in existance

      case actions.CONVERSATION_ID:
         return {...transState, conversationId: action.payload}; //Conversation's id

      case actions.GET_MESSAGES:
         const addedPropertyMessages = [];
         const addedPropertyMessage = {messageSelected: false};
         const messagesObj = action.payload;
         messagesObj[0].messages.forEach(message => {
            const addingPropertyMessage = Object.assign(message, addedPropertyMessage);
            addedPropertyMessages.push(addingPropertyMessage);
         });
         messagesObj[0].messages = addedPropertyMessages
         return {...transState, messages: messagesObj}; //Messages from a conversation

      case actions.CHAT_USER:
         return {...transState, chatUser: action.payload}; //User chatting with the userApp

      case actions.SCROLL_TO_LAST_MESSAGE:
         return {...transState, scrollChatBody: false};

      case actions.SELECT_MESSAGE:
         transState.messages[0].messages[action.payload].messageSelected = !transState.messages[0].messages[action.payload].messageSelected
         return transState;

      default:
         return prevState;
   }
};
