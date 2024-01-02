// reducers.ts
import { AnyAction, Reducer, combineReducers } from '@reduxjs/toolkit';
import AuthSlice from '../database/Auth/AuthSlice';
import UserSlice from '../database/User/UserSlice'
const rootReducer: Reducer<any, AnyAction> = combineReducers({
  auth: AuthSlice,
  user:UserSlice,
  // Add other slices or reducers as needed
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
