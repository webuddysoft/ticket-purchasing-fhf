import { v4 as uuidv4 } from "uuid";
import { CARD, DELIVERY, PAYMENT } from "../types";
import { DeliveryMethods } from "../data";

export const formatCurrency = (value: number): string => {
  return `$${value.toFixed(2)}`;
}

export const generateNewPaymentMethod = () => ({
  id: uuidv4(),
  isNew: true,
  card: {
    no: "",
    name: "",
    exp: "",
    cvc: ""
  },
  isEditing: true,
  newCard: {
    no: "",
    name: "",
    exp: "",
    cvc: ""
  }
});

export const validateCard = (card: CARD) => (card.no && card.name && card.exp && card.cvc)

export const validatePaymentMethod = (payment: PAYMENT) => validateCard(payment.card) || (payment.newCard && validateCard(payment.newCard));

export const getDeliveryMethod = (id: number | null): DELIVERY | undefined => DeliveryMethods.find((delivery) => delivery.id === id);