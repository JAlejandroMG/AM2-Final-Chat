import * as actions from '../actionTypes';

const INITIAL_STATE = {
   user: false
}


export const authReducer = (prevState = INITIAL_STATE, action) => {
   const transState = JSON.parse(JSON.stringify(prevState));

   switch(action.type){
      case actions.SET_USER:
         return {...transState, user: action.payload}; //User connected to Firebase
      default:
         return prevState;
   };
};
