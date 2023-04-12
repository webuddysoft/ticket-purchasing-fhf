import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";

import { DeliveryMethods, UpcomingShows } from "../data";
import { CARD, CART, DELIVERY, ORDER, PAYMENT, SHOW } from "../types";
import { generateNewPaymentMethod } from "./lib";
import { RootState } from "./store";

interface TICKET_STATUS {
  shows: Array<SHOW>;
  cart: CART | null,
  orders: Array<ORDER>;
  payments: Array<PAYMENT>;
  deliveryMethodId: number | null;
  paymentMethodId: string | null;
}

const initialState: TICKET_STATUS = {
  shows: UpcomingShows,
  cart: null,
  orders: [],
  deliveryMethodId: null,
  paymentMethodId: null,
  payments: [
    generateNewPaymentMethod()
  ]
}

export const ticketSlice = createSlice({
  name: 'ticket',
  initialState,
  reducers: {
    updateCart: (state, action: PayloadAction<{cart: CART | null; deliveryMethodId: number | null; paymentMethodId: string | null }>) => {
      state.cart = action.payload.cart;
      state.deliveryMethodId = action.payload.deliveryMethodId;
      state.paymentMethodId = action.payload.paymentMethodId;
      state.payments = state.payments.map((payment) => ({...payment, card: {...payment.card, cvc: ''}}));
    },
    updateDeliveryMethod: (state, action: PayloadAction<number | null>) => {
      state.deliveryMethodId = action.payload;
    },
    updatePaymentMethodMode: (state, action: PayloadAction<{id: string; isEditing: boolean}>) => {
      state.payments = state.payments.map((payment: PAYMENT) => {
        if (action.payload.id === payment.id) {
          payment.isEditing = action.payload.isEditing;
          payment.newCard = payment.isEditing ? {...payment.card} : null;
        }
        return payment;
      });
    },
    updatePaymentMethodCardInfo: (state, action: PayloadAction<{id: string; key: keyof CARD, value: string}>) => {
      state.payments = state.payments.map((payment: PAYMENT) => {
        if (action.payload.id === payment.id && payment.newCard) {
          payment.newCard[action.payload.key] = action.payload.value;
        }
        return payment;
      });
    },
    updatePaymentMethodCardCVC: (state, action: PayloadAction<{id: string; value: string}>) => {
      state.payments = state.payments.map((payment: PAYMENT) => {
        if (action.payload.id === payment.id) {
          payment.card.cvc = action.payload.value;
        }
        return payment;
      });
    },
    savePaymentMethod: (state, action: PayloadAction<PAYMENT>) => {
      state.paymentMethodId = action.payload.id;      
      state.payments = state.payments.map((payment: PAYMENT) => {
        if (payment.id === action.payload.id) {
          payment.isNew = false;
          payment.isEditing = false;
          payment.card = {...action.payload.newCard!};
          payment.newCard = null;
        }
        return payment;
      });
      if (action.payload.isNew === true) {
        state.payments.push(generateNewPaymentMethod());  
      }
    },
    clearNewPaymentMethodCardInfo: (state, action: PayloadAction<string>) => {
      state.payments = state.payments.map((payment: PAYMENT) => {
        if (action.payload === payment.id && payment.newCard) {
          payment.newCard.name = '';
          payment.newCard.no = '';
          payment.newCard.exp = '';
          payment.newCard.cvc = '';
        }
        return payment;
      });
      state.paymentMethodId = state.payments[0].id;
    },
    selectPaymentMethod: (state, action: PayloadAction<string>) => {
      state.paymentMethodId = action.payload;
    },    
    addNewPaymentMethod: (state) => {
      state.payments.push(generateNewPaymentMethod());
    },
    removePayment: (state, action: PayloadAction<string>) => {
      let pos: number | null = null;
      state.payments.forEach((payment: PAYMENT, index: number) => {
        if (payment.id === action.payload) {
          pos = index; 
        }
      });
      if (pos !== null) {
        state.payments.splice(pos, 1);
        if (state.paymentMethodId === action.payload) {
          state.paymentMethodId = state.payments.length > 0 ? state.payments[0].id : null;
        }
      }
    },
    processOrder: (state, action: PayloadAction<{cart: CART, payment: PAYMENT, deliveryMethodId: number}>) => {
        state.shows.forEach((show) => {
          if (show.id === action.payload.cart.showId) {
            show.inventory = show.inventory - action.payload.cart.amount;
          }
        });
        state.orders.push({...action.payload.cart, payment: action.payload.payment, deliveryMethodId: action.payload.deliveryMethodId});
    },
  }
});

export const { 
  updateCart, 
  processOrder, 
  updateDeliveryMethod, 
  removePayment, 
  updatePaymentMethodMode,
  updatePaymentMethodCardInfo, 
  clearNewPaymentMethodCardInfo,
  updatePaymentMethodCardCVC,
  selectPaymentMethod,
  addNewPaymentMethod, 
  savePaymentMethod 
} = ticketSlice.actions;

export const getUpcomingShows = (state: RootState): Array<SHOW> => state.ticket.shows;

export const getCart = (state: RootState): CART | null => state.ticket.cart;

export const getPayments = (state: RootState): Array<PAYMENT> => state.ticket.payments;

export const getPaymentMethodId = (state: RootState): string | null => state.ticket.paymentMethodId;

export const getPaymentMethod = (state: RootState): PAYMENT | null => state.ticket.payments.find((p) => p.id === state.ticket.paymentMethodId) ?? null;

export const getDeliveryMethodId = (state: RootState): number | null => state.ticket?.deliveryMethodId;

export default ticketSlice.reducer;