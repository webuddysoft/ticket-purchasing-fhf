# Ticket Purchasing System - Assessment for First Help Financial LLC

## Author: James Chang

React, Redux, Typescript, MUI

## How to run the application 
npm install <br />
npm start

## Summary
I defined the types of the data that was used on this application in `src/types.ts` file. <br />
And the `src/data.ts` file includes the sample <i>Showings</i> and <i>DeliveryMethods</i>, and <i>Fee</i> data.

Showings data includes the showing detail information:
ex:
```javascript
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
  }
```
The "delivery" property refers to the available delivery methods for a particular showing, while the "fee" refers to the associated fees for that showing.If the "amount" property is not present, the "Fees" will be used to determine the amount.

In order to share data and status between components, I utilized `Redux`.
The relevant files are "store.ts", "ticketSlice.ts", "hooks.ts", and "alertSlice.ts".

The "store" includes the showings, cart, selected delivery method and payment method, saved payment methods and the orders.

Showings includes the available showing data and when the user make an order, the inventory will be reduced.

Cart includes the user cart data.

Payments includes the payment methods that the user saved.

Orders include the order details that the user placed.

It's important to note that all data is reset when the browser is refreshed because there is no connection to a backend system.

To design the user interface, I used MUI, which is fully responsible for the design aspect.