import * as actions from '../actionTypes';



const INITIAL_STATE = {
   atLeastOneConversationSelected: false,
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
         atLeastOneMessageSelected: false,
         messages: []
      }
   ],
   ownConversations: [],
   scrollChatBody: true
};



export const chatReducer = (prevState = INITIAL_STATE, action) => {
   const transState = JSON.parse(JSON.stringify(prevState));

   switch(action.type) {
      case actions.CHAT_USER:
         return {...transState, chatUser: action.payload}; //User chatting with the userApp

      case actions.CONVERSATION_ID:
         return {...transState, conversationId: action.payload}; //Conversation's id

      case actions.GET_CONVERSATIONS:
         const addedPropertyConversations = [];
         const addedPropertyConversation = {conversationSelected: false};
         const conversationsObj = action.payload;
         conversationsObj.map(conversation => {
            const addingPropertyConversation = Object.assign(conversation, addedPropertyConversation);
            addedPropertyConversations.push(addingPropertyConversation);
            return true;
         });
         return {...transState, conversations: addedPropertyConversations}; //Conversations in existance

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

      case actions.GET_OWN_CONVERSATIONS:
         const myConversations = [];
         action.payload.ownConversations.forEach(conversation => {
            conversation.members.forEach( member => {
               member === action.payload.userAppId && myConversations.push(conversation);
            });
         });
         return {...transState, ownConversations: myConversations};

      case actions.IS_AT_LEAST_ONE_CONVERSATION_SELECTED:
         let isAtLeastOneConversationSelected = false;
         isAtLeastOneConversationSelected = transState.ownConversations.some(conversation => {
            return conversation.conversationSelected === true
         });
         isAtLeastOneConversationSelected ?
         transState.atLeastOneConversationSelected = true :
         transState.atLeastOneConversationSelected = false;
         return transState;

      case actions.IS_AT_LEAST_ONE_MESSAGE_SELECTED:
         let isAtLeastOneMessageSelected = false;
         isAtLeastOneMessageSelected = transState.messages[0].messages.some(message => {
            return message.messageSelected === true
         });
         isAtLeastOneMessageSelected ?
         transState.messages[0].atLeastOneMessageSelected = true :
         transState.messages[0].atLeastOneMessageSelected = false;
         return transState;

      case actions.RESET_CHAT_MESSAGES:
         return {...transState, messages: [{ _id: false, atLeastOneMessageSelected: false, messages: [] }]};
         // return {...transState, scrollChatBody: false};

      case actions.RESET_CHAT_REDUCER:
         return {
            atLeastOneConversationSelected: false,
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
                  atLeastOneMessageSelected: false,
                  messages: []
               }
            ],
            ownConversations: [],
            scrollChatBody: true
         };

      case actions.SCROLL_TO_LAST_MESSAGE:
         return {...transState, scrollChatBody: false};

      case actions.SELECT_MESSAGE:
         transState.messages[0].messages[action.payload].messageSelected = !transState.messages[0].messages[action.payload].messageSelected
         return transState;

      case actions.SELECT_CONVERSATION:
         const conversationSelectedPosition = transState.ownConversations.findIndex(conversation => {
            return conversation._id === action.payload;
         })
         transState.ownConversations[conversationSelectedPosition].conversationSelected = !transState.ownConversations[conversationSelectedPosition].conversationSelected;
         return transState;

      default:
         return prevState;
   }
};
