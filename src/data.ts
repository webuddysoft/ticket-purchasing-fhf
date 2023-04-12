import { DELIVERY, FEE, SHOW } from "./types";

export const DeliveryMethods: Array<DELIVERY> = [
  {
    id: 1,
    name: 'Mobile',
    description: "Your phone's your ticket. Locate your tickets in your account - or in your app. When you go mobile, your tickets will not be emailed to you or available for print.",
    price: 0
  },
  {
    id: 2,
    name: 'Will Call',
    description: "Tickets held at Will Call can only be retrieved by the cardholder with original credit card of purchase and a valid photo ID with signature such as a state ID, driver's license or passport.",
    price: 0
  },
  {
    id: 3,
    name: '2 Business Day (Evening)',
    description: 'By 7:30 PM in 2 business days via UPS (no delivery to PO Box or APO/FPO addresses).',
    price: 18.50
  },
  {
    id: 4,
    name: '3 Business Day (Evening)',
    description: "By 7:30 PM in 3 business days via UPS (no delivery to PO Box or APO/FPO addresses).",
    price: 14.5
  }
];

export const Fees: Array<FEE> = [
  {
    id: 1,
    name: 'Service Fee',
    amount: 0.15
  },
  {
    id: 2,
    name: 'Order Processing Fee',
    amount: 0.09
  }
];

export const UpcomingShows: Array<SHOW> = [
  {
    id: 1,
    name: 'Stevie Nicks',
    date: '2023-04-20',
    time: '19:00',
    price: 45,
    inventory: 10,
    location: 'Birmingham, AL',
    place: 'Legacy Arena at The BJCC',
    description: 'xfr XFER',
    delivery: [1, 2, 3],
    fee: [
      {
        id: 1,
        amount: 0.18
      },
      {
        id: 2,
        amount: 0.11
      }
    ]
  },
  {
    id: 2,
    name: 'Billy Joel & Stevie Nicks',
    date: '2023-04-22',
    time: '18:00',
    price: 90,
    inventory: 5,
    location: 'Arlington, TX',
    place: 'AT&T Stadium',
    delivery: [1, 2],
    fee: [
      {
        id: 1
      },
      {
        id: 2,
        amount: 0.85
      }
    ]
  },
  {
    id: 3,
    name: 'Stevie Nicks',
    date: '2023-04-24',
    time: '18:00',
    price: 90,
    inventory: 15,
    location: 'Oklahoma City, OK',
    place: 'Paycom Center',
    delivery: [1],
    fee: [
      {
        id: 1,
        amount: 0.08
      },
      {
        id: 2,
        amount: 0.7
      }
    ]
  }
];

