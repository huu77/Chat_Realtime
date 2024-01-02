import { createSlice } from '@reduxjs/toolkit';

 

interface Userype {
  user: any;
  isLoading: boolean;
  error: any;
 
}

const initialState: Userype = {
  user: null,
  isLoading: false,
  error: null
  
};

const UserSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    userStart: (state) => {
      state.isLoading = true;
    
    },
    userSuccess: (state, action) => {
      state.isLoading = false;
      state.user = action.payload;
    },
    userFailure: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

export const getUser = (getU:Function,data:any) => async (dispatch: any) => {
  try {
    dispatch(UserSlice.actions.userStart());
    const response = await getU(data);
    dispatch(UserSlice.actions.userSuccess(response));
  } catch (error) {
     dispatch(UserSlice.actions.userFailure(error))
  }
};

export default UserSlice.reducer;
