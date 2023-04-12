import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../app/store';
import { ALERT, ALERT_TYPES } from '../types';

const initialState: ALERT = {
  type: "success",
  message: "",
  open: false
}

export const alertSlice = createSlice({
  name: 'alert',
  initialState,
  reducers: {
    showAlert: (state, action: PayloadAction<{type: ALERT_TYPES, message: string}>) => {
      state.type = action.payload.type;
      state.message = action.payload.message;
      state.open = true
    },
    hideAlert: (state) => {
      state.open = false;
    }
  }
});
export const {showAlert, hideAlert} = alertSlice.actions;

export const getAlertInfo = (state: RootState): ALERT => state.alert; 

export default alertSlice.reducer;
