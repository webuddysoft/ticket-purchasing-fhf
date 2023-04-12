export type DELIVERY = {
  id: number;
  name: string;
  description: string;
  price: number;
};

export type FEE = {
  id: number;
  name: string;
  amount: number;
};

export type SHOW = {
  id: number;
  name: string;
  date: string;
  time: string;
  price: number;
  inventory: number;
  location: string;
  place: string;
  description?: string;
  delivery: Array<number>;
  fee: Array<{id: number; amount?: number}>;
};

export type CARD = {
  no: string;
  name: string;
  exp: string;
  cvc?: string;
};

export type PAYMENT = {
  id: string;
  card: CARD;
  isNew: boolean;
  isEditing: boolean;
  newCard: CARD | null;
};

export type CART = {
  showId: number; 
  amount: number;
  fee?: Array<FEE>;
};

export type ORDER = CART & {
  deliveryMethodId: number;
  payment: PAYMENT;
};

export type ALERT_TYPES = "success" | "error" | "info" | "warning";

export type ALERT = {
  type: ALERT_TYPES,
  message: string,
  open: boolean
};
