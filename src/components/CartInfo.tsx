import React, { useState, useMemo } from "react";
import { 
  Accordion, 
  AccordionDetails, 
  AccordionSummary, 
  Box, 
  Button, 
  Stack, 
  Typography 
} from "@mui/material";
import { useAppDispatch } from "../app/hooks";
import { formatCurrency, getDeliveryMethod } from "../app/lib";
import { updateCart } from "../app/ticketSlice";
import { UpcomingShows } from "../data";
import { 
  CART, 
  FEE, 
  SHOW 
} from "../types";
import { KeyboardArrowDown } from "@mui/icons-material";

export const CartInfo = (
  {
    cart, 
    deliveryMethodId
  }: 
  {
    cart: CART;
    deliveryMethodId: number | null;
  }
) => {
  const [expanded, setExpanded] = useState<boolean>(false);
  
  const dispatch = useAppDispatch();
  
  const handleClickCancelOrder = () => {
    dispatch(updateCart({cart: null, deliveryMethodId: null, paymentMethodId: null}));
  }

  const deliveryMethod = getDeliveryMethod(deliveryMethodId);
  
  const show: SHOW | undefined = UpcomingShows.find((show) => show.id === cart.showId);

  const TicketsBox = useMemo(() => show 
    ? <Box my={1}>
        <Typography variant="h4">Tickets</Typography>
        <Stack direction="row" justifyContent="space-between">
          <Typography variant="body1">
            {formatCurrency(show.price)} x {cart.amount}
          </Typography>
          <Typography variant="body1">
            {formatCurrency(show.price * cart.amount)}
          </Typography>
        </Stack>
      </Box>  
    : null
  , [cart.showId, cart.amount]);

  const FeesBox = useMemo(() => show
    ? <Box my={1}>
        <Typography variant="h4">Fees</Typography>
        {cart.fee && cart.fee.map((fee: FEE) => (
          <Stack 
            key={`fee${fee.id}`}
            direction="row" 
            justifyContent="space-between"
          >
            <Typography variant="body1">            
              {fee.name}
            </Typography>
            <Typography variant="body1">
              {formatCurrency(show.price * cart.amount * fee.amount)}
            </Typography>
          </Stack>
        ))}
      </Box> 
    : null
  , [cart.showId, cart.amount, cart.fee]);

  const DeliveryBox = useMemo(() => 
    <Box my={1}>
      <Typography variant="h4">Delivery</Typography>
      {deliveryMethod  
        ? <Stack direction="row" justifyContent="space-between">
            <Typography variant="body1">
              {deliveryMethod.name}
            </Typography>
            <Typography variant="body1">
              {deliveryMethod.price > 0 ? formatCurrency(deliveryMethod.price) : 'Free'}
            </Typography>
          </Stack>
        : <Typography variant="body1">No delivery method found.</Typography>
      }
    </Box>  
    , [deliveryMethod]);

  if (!show) {    
    return <Typography variant="body1">Incorrect ticket in your cart.</Typography>;
  }

  let totalPrice = 0;
  if (show) {
    totalPrice += show.price * cart.amount;
  }
  if (cart.fee && show) {
    cart.fee.forEach((fee) => {
      totalPrice += show.price * cart.amount * fee.amount;
    })
  }
  if (deliveryMethod) {
    totalPrice += deliveryMethod.price;
  }


  return (
    <React.Fragment>
      <Accordion 
        expanded={expanded} 
        onChange={() => setExpanded((prev) => !prev)}
        sx={{
          boxShadow: "none"
        }}
      >
        <AccordionSummary 
          expandIcon={<KeyboardArrowDown />} 
          id="card-total-header"
          sx={{
            padding: 0,
          }}
        >
          <Stack 
            direction="row" 
            justifyContent="space-between"
            flexGrow={1}
          >
            <Typography variant="h3">Total</Typography>
            <Typography variant="h3">{formatCurrency(totalPrice)}</Typography>
          </Stack>
        </AccordionSummary>
        <AccordionDetails sx={{px: 0}}>
          {TicketsBox}
          {FeesBox}
          {DeliveryBox}
          <Button onClick={handleClickCancelOrder}>Cancel Order</Button>
        </AccordionDetails>
      </Accordion>
    </React.Fragment>
  )
}