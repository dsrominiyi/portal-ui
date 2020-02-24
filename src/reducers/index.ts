import { combineReducers } from 'redux';
import user from './user';
import customer from './customer';
import search from './search';

export default combineReducers({
  user,
  customer,
  search
});
