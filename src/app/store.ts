import { Action, configureStore, ThunkAction } from "@reduxjs/toolkit";
import alertSliceReducer from "./alertSlice";
import ticketSliceReducer from "./ticketSlice";

export const store = configureStore({
  reducer: {
    ticket: ticketSliceReducer,
    alert: alertSliceReducer
  }
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<String>
>;