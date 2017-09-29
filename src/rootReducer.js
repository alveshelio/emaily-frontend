import { combineReducers } from 'redux';
import user from './reducers/user';
import navigation from './reducers/navigation';
import billing from './reducers/billing';
import surveys from './reducers/surveys';

export default combineReducers({
  user,
  navigation,
  billing,
  surveys
});
