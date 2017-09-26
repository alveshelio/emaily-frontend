import { combineReducers } from 'redux';
import user from './reducers/user';
import navigation from './reducers/navigation';
import billing from './reducers/billing';

export default combineReducers({
  user,
  navigation,
  billing
});
