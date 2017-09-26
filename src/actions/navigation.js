import { TOGGLE_MENU_STATE } from '../constants/types';

export const toggleMenuState = (menuVisible) => (
  {
    type: TOGGLE_MENU_STATE,
    menuVisible
  }
);
