import * as actions from '../actionTypes';

export const toggleLoader = () => {
   return {
      type: actions.TOGGLE_LOADER,
   }
};