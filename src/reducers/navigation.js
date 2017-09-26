import { TOGGLE_MENU_STATE } from '../constants/types';

export default function navigation(state = { menuVisible: false}, action = {}) {
  switch(action.type) {
    case TOGGLE_MENU_STATE:
      return { ...state, menuVisible: action.menuVisible};
    default:
      return state;
  }
}
