import * as actions from '../actionTypes';

const INITIAL_STATE = {
   user: false
}


export const authReducer = (prevState = INITIAL_STATE, action) => {
   const transState = JSON.parse(JSON.stringify(prevState));

   switch(action.type){
      case actions.SET_USER:
         return {...transState, user: action.payload};
      case "LOGOUT":
         break;
      case "CHECK_ACTIVE_SESSION":
         break;
      default:
         return prevState;
   };
};
