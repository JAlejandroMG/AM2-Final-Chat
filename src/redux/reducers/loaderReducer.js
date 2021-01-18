import * as actions from '../actionTypes';



const INITIAL_STATE = {
  loader: false
};



export const loaderReducer = (prevState = INITIAL_STATE, action) => {
  const transState = JSON.parse(JSON.stringify(prevState));
  switch(action.type){
    case actions.TOGGLE_LOADER:
      transState.loader = !transState.loader; //Toggle Loader
      return transState; 

    default:
      return prevState;
  };
};
