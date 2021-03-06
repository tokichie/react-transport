import { combineReducers } from 'redux';
import app from './app';
import view from './view';
import users from './users';
import panels from './panels';
import { reducer as tooltip } from 'redux-tooltip';

export default combineReducers(
  { app, view, users, panels, tooltip }
);
