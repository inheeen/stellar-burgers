import { combineReducers } from '@reduxjs/toolkit';
import authReducer from './slices/auth-slice';
import ingredientsReducer from './slices/ingredients-slice';

export const rootReducer = combineReducers({
  ingredients: ingredientsReducer,
  auth: authReducer
});