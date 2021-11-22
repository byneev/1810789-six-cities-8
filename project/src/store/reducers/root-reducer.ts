import { combineReducers } from '@reduxjs/toolkit';
import { appReducer } from './app-reducer';
import { userReducer } from './user-reducer';

export enum NameSpace {
  webApp = 'WebApp',
  user = 'User',
}

export const rootReducer = combineReducers({
  [NameSpace.webApp]: appReducer,
  [NameSpace.user]: userReducer,
});

export type RootStateProps = ReturnType<typeof rootReducer>;
