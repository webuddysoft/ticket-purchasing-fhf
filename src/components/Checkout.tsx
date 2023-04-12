import { 
  Box, 
  Button, 
  Checkbox, 
  Container, 
  FormControlLabel, 
  Grid, 
  Link, 
  Typography 
} from "@mui/material"
import 
  React, 
  { 
    useMemo, 
    useCallback, 
    useState 
  } 
from "react";
import { useAppDispatch, useAppSelector } from "../app/hooks"
import { validatePaymentMethod } from "../app/lib";
import { 
  getCart, 
  getDeliveryMethodId, 
  getPaymentMethod, 
  processOrder, 
  updateCart
} from "../app/ticketSlice"
import { CART, PAYMENT } from "../types";
import { CartInfo } from "./CartInfo";
import { DeliveryInfo } from "./DeliveryInfo";
import { PaymentInfo } from "./PaymentInfo";
import { showAlert } from "../app/alertSlice";

export const Checkout = () => {
  const [agreeTerms, setAgreeTerms] = useState<boolean>(false);
  const cart:CART | null = useAppSelector(getCart);
  const deliveryMethodId: number | null = useAppSelector(getDeliveryMethodId);
  const paymentMethod: PAYMENT | null = useAppSelector(getPaymentMethod);
  const dispatch = useAppDispatch();
  
  const DeliveryInfoBox = useMemo(
    () => !deliveryMethodId ? null : <DeliveryInfo selectedId={deliveryMethodId} />
    , [deliveryMethodId]
  );

  const CartInfoBox = useMemo(
    () => !cart 
    ? null 
    : <CartInfo 
        cart={cart} 
        deliveryMethodId={deliveryMethodId} 
      />
    , [cart, deliveryMethodId]
  );

  const PaymentInfoBox = useMemo(
    () => !paymentMethod ? null : <PaymentInfo selected={paymentMethod} />
    , [paymentMethod]
  )

  const handlePlaceOrder = useCallback(() => {
    if (!paymentMethod || !validatePaymentMethod(paymentMethod)) {
      dispatch(showAlert({type: "error", message: "Please complete the payment infomration."}));
      return;
    }
    dispatch(processOrder({cart: cart!, payment: paymentMethod!, deliveryMethodId: deliveryMethodId!}));
    dispatch(updateCart({cart: null, deliveryMethodId: null, paymentMethodId: null}));
  }, [paymentMethod, deliveryMethodId]);

  return (
    <Container maxWidth="lg">
      <Box mb={2}>
        <Typography variant='h3'>Checkout</Typography>
      </Box>
      <Grid container>
        <Grid item xs={12} md={8}>
          <Box 
            border={1}
            borderColor="grey.400"
            borderRadius={1}
            p={2}
          >
            {DeliveryInfoBox}
          </Box>
          <Box 
            border={1}
            borderColor="grey.400"
            borderRadius={1}
            p={2}
            mt={3}
          >
            {PaymentInfoBox}
          </Box>
        </Grid>
        <Grid item xs={12} md={4}>
          <Box 
            border={1}
            borderColor="grey.400"
            borderRadius={1}
            p={2}
            sx={{
              ml: {
                xs: 0,
                md: "20px"
              },
              mt: {
                xs: 3,
                md: 0
              }
            }}
          >
            {CartInfoBox}

            <Typography 
              variant="body1" 
              fontWeight="bold"
              mb={2}
            >
              * All Sales Final - No Refunds
            </Typography>

            <FormControlLabel 
              control={<Checkbox sx={{pt: 0}} checked={agreeTerms} onChange={(e) => setAgreeTerms(e.target.checked)} />}                 
              label={<Typography variant="body1" fontWeight="bold">I have read and agree to the current <Link href="#">Terms of Use</Link></Typography>} 
              sx={{
                alignItems: "flex-start"
              }}
            />
            
            <Button 
              fullWidth 
              variant="contained" 
              color="success" 
              size="large"
              sx={{
                mt: 3
              }}
              disabled={!agreeTerms}
              onClick={(e) => handlePlaceOrder()}
            >
              Place Order
            </Button>
          </Box>
        </Grid>
      </Grid>
    </Container>
  )
}