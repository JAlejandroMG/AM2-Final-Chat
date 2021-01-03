import * as actions from '../actionTypes';

const INITIAL_STATE = {
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
      default:
         return prevState;
   }
};


//!Conversations
/* 
conversations: Array(9)
0:
info:
email: "oislasreyes@gmail.com"
firstName: "Oscar"
lastName: "Islas Reyes"
photoUrl: ""
uid: "2mMbeWxkmbdMgDgIsaGPNEmntQz2"
username: "oislasreyes"
__v: 0
_id: "5fdbf8baa158063ea44132e6"
__proto__: Object
members: Array(2)
0: "5fdbf8baa158063ea44132e6"
1: "5fdbfc94ffbdfb57c849d416"
length: 2
__proto__: Array(0)
membersObj: Array(2)
0:
email: "oislasreyes@gmail.com"
firstName: "Oscar"
lastName: "Islas Reyes"
photoUrl: ""
uid: "2mMbeWxkmbdMgDgIsaGPNEmntQz2"
username: "oislasreyes"
__v: 0
_id: "5fdbf8baa158063ea44132e6"
*/

//! Messages
/* 
messages: Array(1)
   0:
      members: (2) ["5fdd9238774450001755805d", "5fdd9355774450001755805e"]
      messages: Array(7)
      0:
         conversationId: "5fe15a225901e80017f682d3"
         message: "Hi, my name is Dawn, Forest Dawn"
         received: false
         timestamp: "1970-01-19T14:45:37.143Z"
         userId: "5fdd9238774450001755805d"
      __v: 0
      _id: "5fe15b5a5901e80017f682d5"
      __proto__: Object
      length: 1
      __proto__: Array(0)
      __v: 0
      _id: "5fe15a225901e80017f682d3" //* Conversation
      selectedMessage: false
*/