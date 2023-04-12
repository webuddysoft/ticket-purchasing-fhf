import { useState } from "react";
import moment from "moment";
import { 
  Box, 
  Button, 
  Container, 
  Divider, 
  IconButton, 
  Stack, 
  TextField, 
  Typography 
} from "@mui/material";
import { 
  Add, 
  Remove, 
  PlaceOutlined, 
  BusinessOutlined 
} from "@mui/icons-material";
import { grey } from "@mui/material/colors";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { 
  getDeliveryMethodId, 
  getPaymentMethod, 
  getPayments, 
  getUpcomingShows, 
  updateCart 
} from "../app/ticketSlice";
import { 
  CART, 
  DELIVERY, 
  FEE, 
  SHOW 
} from "../types";
import { showAlert } from "../app/alertSlice";
import { DeliveryMethods, Fees } from "../data";
import { formatCurrency } from "../app/lib";

const Show = ({detail} : {detail: SHOW}) => {
  const [quantity, setQuantity] = useState(1);
  const dispatch = useAppDispatch();
  const payments = useAppSelector(getPayments);
  const deliveryMethodId = useAppSelector(getDeliveryMethodId);
  const paymentMethod = useAppSelector(getPaymentMethod);

  const handleClickPurchase = () => {
    if (quantity > 0 && quantity <= detail.inventory) {
      const fees: Array<FEE> = [];
      Fees.forEach((fee) => {
        const currentFee = detail.fee.find((f) => f.id === fee.id);
        if (currentFee) {
          fees.push({...fee, ...currentFee});
        }
      });
      
      const cart: CART = {
        showId: detail.id, 
        amount: quantity,
        fee: fees
      };

      let defaultDeliveryMethodId = deliveryMethodId;
      if (!deliveryMethodId || !detail.delivery.includes(deliveryMethodId)) {
        const defaultDeliveryMethod = DeliveryMethods.find((delivery: DELIVERY) => delivery.id === detail.delivery[0]);
        defaultDeliveryMethodId = defaultDeliveryMethod ? defaultDeliveryMethod.id : null;
      }

      let defaultPaymentMethodId = paymentMethod ? paymentMethod.id : null;
      if (!paymentMethod || (paymentMethod.isNew && payments.length > 1)) {
        defaultPaymentMethodId = payments[0].id;
      } 

      dispatch(
        updateCart(
          {
            cart, 
            deliveryMethodId: defaultDeliveryMethodId, 
            paymentMethodId: defaultPaymentMethodId
          }
        )
      );
    } else {
      dispatch(showAlert({type: "error", message: "Inventory is not enough."}));
    }
  }
  
  return (
    <Box 
      display="flex"
      alignItems="center"
      border={1}
      borderColor="grey.400"
      borderRadius={1}
      p={2}
      my={1}
      sx={{
        flexDirection: {
          xs: "column",
          sm: "row"
        },
        gap: {
          xs: 2,
          sm: 0
        },
        flexWrap: {
          xs: "wrap",
          sm: "nowrap"
        }
      }}
    >
      <Box 
        display="flex" 
        flexDirection="column"
        pr={2}
      >
        <Typography variant="date">
          {moment(detail['date'], "YYYY-MM-DD").format("MMM D, YYYY")}
        </Typography>
        <Box 
          display="flex" 
          gap="5px" 
          justifyContent="center"
        >
          <Typography variant="time">
            {moment(detail['date'], "YYYY-MM-DD").format("ddd")}                  
          </Typography>
          <Typography variant="time">
            {moment(detail['time'], "HH:mm").format("h:mm A")}
          </Typography>
        </Box>
      </Box>
      <Box 
        flexGrow={1} 
        display="flex" 
        flexDirection="column"
      >
        <Divider 
          sx={{
            mb: 2,
            borderColor: grey[400],
            display: {
              xs: "block",
              sm: "none"
            }
          }} 
        />
        <Typography variant="h4">
          {`${detail['name']} - ${formatCurrency(detail['price'])}`}
        </Typography>
        <Typography variant="h5" display="flex" alignItems="center">
          <BusinessOutlined fontSize="small" sx={{mr: "2px"}} /> {detail['place']}
        </Typography>
        <Typography variant="h5" display="flex" alignItems="center">
          <PlaceOutlined fontSize="small" sx={{mr: "2px"}} /> {detail['location']}
        </Typography>
      </Box>
      <Box>
        <Divider 
          sx={{
            mb: 1,
            borderColor: grey[400],
            display: {
              xs: "block",
              sm: "none"
            }
          }} 
        />
        <Typography 
          fontSize="14px" 
          fontWeight="bold"
          sx={{
            textAlign: {
              xs: "center",
              sm: "left"
            }
          }}
        >
          Available Tickets: {detail['inventory']}
        </Typography>
        {
        detail['inventory'] > 0 
          ? (
              <Stack direction="row" py="10px" gap="10px">
                <Stack direction="row">
                  <IconButton 
                    color="primary" 
                    disabled={quantity <= 1} 
                    onClick={() => setQuantity((prev) => prev - 1)}
                  >
                    <Remove />
                  </IconButton>
                  <TextField
                    type="text" 
                    size="small" 
                    variant="standard"
                    autoComplete="off"
                    sx={{
                      width: "40px",
                      px: "5px"
                    }}
                    inputProps={{style: {textAlign: "center"}}}
                    value={quantity}
                  />
                  <IconButton 
                    color="primary" 
                    disabled={quantity >= detail['inventory']}
                    onClick={() => setQuantity((prev) => prev + 1)}
                  >
                    <Add />
                  </IconButton>
                </Stack>
                <Button variant="contained" size="small" onClick={handleClickPurchase}>Purchase</Button>
              </Stack>
            )
          : (
            <Stack direction="row" py="10px" gap="10px">
              <Typography textAlign="center" sx={{width: '120px'}}>Sold out</Typography>
              <Button variant="contained" size="small" disabled={true}>Purchase</Button>
            </Stack>
          )
        }
      </Box>
    </Box>
  )
}

export const Shows = () => {
  const upcomingShows: Array<SHOW> = useAppSelector(getUpcomingShows);
  return (
    <Container maxWidth="lg">
      <Box>
        <Typography variant='h3'>Shows</Typography>
        <Stack direction="column">
          {upcomingShows.map((show: SHOW) => <Show detail={show} key={`show${show['id']}`} />)}
        </Stack>
      </Box>
    </Container>
  )
}