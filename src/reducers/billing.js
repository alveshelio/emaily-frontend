import { UPDATE_CREDITS, FETCH_CREDITS } from '../constants/types';

export default function billing(state = {}, action = {}) {
  switch(action.type) {
    case UPDATE_CREDITS:
      return { ...state, credits: action.credits };
    case FETCH_CREDITS:
      return { ...state, credits: action.credits };
    default:
      return state;
  }
}