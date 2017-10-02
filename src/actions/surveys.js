import { ADD_SURVEY, TOTAL_SURVEYS, UPDATE_SURVEY_STATUS, FETCH_SURVEY } from '../constants/surveys';
import { GET_ALL_SURVEYS_FROM_USER } from '../constants/user';
import { updateCredits } from './billing';

import api from '../api';

export const addSurvey = survey => ({
  type: ADD_SURVEY,
  survey
});

export const totalSurveys = total => ({
  type: TOTAL_SURVEYS,
  total
});

export const updateSurveyStatus = survey => ({
  type: UPDATE_SURVEY_STATUS,
  survey
});

export const getSurveys = surveys => ({
  type: GET_ALL_SURVEYS_FROM_USER,
  surveys
});

export const getSurvey = survey => ({
  type: FETCH_SURVEY,
  survey
});

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

export const sendSurvey = surveyId => dispatch => api.surveys.sendSurvey(surveyId)
  .then(result => {
    dispatch(updateSurveyStatus(result.survey));
    dispatch(updateCredits(result.credits));
  });

export const fetchSurvey = surveyId => dispatch =>
  api.surveys.fetchSurvey(surveyId)
    .then(result => {
      dispatch(getSurvey(result));
    });
