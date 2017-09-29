import { ADD_SURVEY, TOTAL_SURVEYS, UPDATE_SURVEY_STATUS } from '../constants/surveys';
import { GET_ALL_SURVEYS_FROM_USER } from '../constants/user';

const initialState = {
  surveys: [],
  count: 0
};
export default function surveys(state = initialState, action = {}) {
  switch (action.type) {
    case ADD_SURVEY:
      return { ...state, surveys: [ ...action.survey ] };
    case TOTAL_SURVEYS:
      return { ...state, count: action.total };
    case UPDATE_SURVEY_STATUS:

    case GET_ALL_SURVEYS_FROM_USER:
      return { ...state, surveys: [ ...action.surveys ] };
    default:
      return state;
  }
}