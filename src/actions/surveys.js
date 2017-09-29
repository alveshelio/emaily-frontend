import { ADD_SURVEY, TOTAL_SURVEYS } from '../constants/surveys';
import { GET_ALL_SURVEYS_FROM_USER } from '../constants/user';

import api from '../api';

export const addSurvey = survey => ({
  type: ADD_SURVEY,
  survey
});

export const totalSurveys = total => ({
  type: TOTAL_SURVEYS,
  total
});

export const updateSurveySatus = status => {
  return ({

  })
};

export const getSurveys = surveys =>{
  return ({
    type: GET_ALL_SURVEYS_FROM_USER,
    surveys
  });
};

export const createSurvey = survey => dispatch =>
  api.surveys.createSurvey(survey).then(result => {
    dispatch(addSurvey(result));
    return result;
  });

export const getAllSurveys = (userId, nPerPage, pageNumber) => dispatch =>
  api.surveys.getSurveysBelongToUser(userId, nPerPage, pageNumber)
    .then(result => {
      dispatch(getSurveys(result.surveys));
      dispatch(totalSurveys(result.totalSurveys));
      return result.surveys;
    });