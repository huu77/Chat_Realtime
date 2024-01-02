import { createSlice } from '@reduxjs/toolkit';

import { Login } from './interface';

interface AuthType {
  user: any;
  isLoading: boolean;
  error: any;
 
}

const initialState: AuthType = {
  user: null,
  isLoading: false,
  error: null
  
};

const AuthSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginStart: (state) => {
      state.isLoading = true;
    
    },
    loginSuccess: (state, action) => {
      state.isLoading = false;
      state.user = action.payload;
    },
    loginFailure: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

export const loginUser = (login:Function,data:Login) => async (dispatch: any) => {
  try {
    dispatch(AuthSlice.actions.loginStart());
    const response = await login(data);
    dispatch(AuthSlice.actions.loginSuccess(response));
  } catch (error) {
    dispatch(AuthSlice.actions.loginFailure(error));
  }
};

export default AuthSlice.reducer;
