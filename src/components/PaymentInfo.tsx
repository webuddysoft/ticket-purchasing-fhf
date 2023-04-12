import { 
  Add, 
  CheckCircleOutline, 
  CreditCard, 
  ErrorOutlineOutlined 
} from "@mui/icons-material";
import { 
  Box, 
  Button, 
  Divider, 
  Input, 
  Link, 
  Radio, 
  Stack, 
  TextField, 
  Typography 
} from "@mui/material";
import { CARD, PAYMENT } from "../types";
import 
  React, 
  { 
    useState, 
    memo, 
    useCallback 
  } 
from "react";
import InputMask from 'react-input-mask';
import { blue, grey } from "@mui/material/colors";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { 
  clearNewPaymentMethodCardInfo, 
  getPayments, 
  removePayment, 
  savePaymentMethod, 
  selectPaymentMethod, 
  updatePaymentMethodCardCVC, 
  updatePaymentMethodCardInfo, 
  updatePaymentMethodMode 
} from "../app/ticketSlice";
import { validateCard, validatePaymentMethod } from "../app/lib";
import { showAlert } from "../app/alertSlice";

const Payment = memo((
  {
    isSelected,
    payment, 
    hideDelete,
    handleSetShowNewPayment
  } : {
    isSelected: boolean;
    payment: PAYMENT;
    hideDelete: boolean;
    handleSetShowNewPayment: (show: boolean) => void;
  }
) => {
  const dispatch = useAppDispatch();

  const handleChangeCard = (key: keyof CARD, value: string) => {
    dispatch(updatePaymentMethodCardInfo({id: payment.id, key, value}));
  }

  const handleChangCardCVC = (value: string) => {
    dispatch(updatePaymentMethodCardCVC({id: payment.id, value}));
  }

  const handleSavePaymentMethod = () => {
    if (!validateCard(payment.newCard!)) {
      dispatch(showAlert({type: "error", message: "The card data is not valid."}));
      return;
    }
    dispatch(savePaymentMethod(payment));
    if (payment.isNew) {
      handleSetShowNewPayment(false);
    }
  }

  const handleDeletePaymentMethod = (payment: PAYMENT) => {
    if (payment.isNew) {
      dispatch(clearNewPaymentMethodCardInfo(payment.id));
      handleSetShowNewPayment(false);
    } else {
      dispatch(removePayment(payment.id));
    }
  }

  const handleSelectPaymentMethod = (payment: PAYMENT) => {
    if (!isSelected) {
      dispatch(selectPaymentMethod(payment.id));
    }
  };

  const handleTogglePaymentMethodMode = (methodId: string, isEditing: boolean) => {
    dispatch(updatePaymentMethodMode({id: methodId, isEditing: true}));
  }

  return (
    <Stack 
      direction="row" 
      alignItems="flex-start"
      my={1}
      borderRadius={1}
      sx={{
        cursor: "pointer",
        backgroundColor: isSelected ? blue[50] : 'transparent',
        borderColor: isSelected ? blue[200] : 'transparent',
      }}
      gap="10px"
      py={2}
      onClick={() => handleSelectPaymentMethod(payment)}
    >
      <Radio 
        checked={isSelected}
        name="delivery_method"
        value={payment.id} 
      />
      {payment.isEditing
        ? (
          <Stack gap="10px" pr={1}>
            <Stack
              gap="10px"
            >
              <InputMask
                mask="9999 9999 9999 9999"
                value={payment.newCard!.no}
                onChange = {(e) => handleChangeCard("no", e.target.value)}
              >
                <TextField label="Card Number" autoComplete="off" />
              </InputMask>
              <TextField 
                label="Full Name"  
                autoComplete="off"
                value={payment.newCard!.name}
                onChange = {(e) => handleChangeCard("name", e.target.value)}
              />
              <Stack direction="row" gap="10px">
                <InputMask
                  mask="99/99"
                  value={payment.newCard!.exp}
                  onChange = {(e) => handleChangeCard("exp", e.target.value)}
                >
                  <TextField label="MM/YY" autoComplete="off" />
                </InputMask>
                <InputMask
                  mask="999"
                  value={payment.newCard!.cvc}
                  onChange = {(e) => handleChangeCard("cvc", e.target.value)}
                >
                  <TextField label="CVC" autoComplete="off" />
                </InputMask>
              </Stack>
            </Stack>
            <Stack direction="row" gap="5px">
              <Button onClick={handleSavePaymentMethod}>Save</Button>
              {!hideDelete && 
                <Divider 
                  orientation="vertical" 
                  flexItem 
                  sx={{
                    my: 1,
                    borderColor: grey[500]
                  }} 
                />
              }
              {!hideDelete && <Button onClick={(e) => [e.stopPropagation(), handleDeletePaymentMethod(payment)]}>Delete</Button>}
            </Stack>
          </Stack>
        )
      : (
        <Stack gap="10px">
          <Typography variant="h4">Card - {payment.card.no.substring(0, 4)} xxxx xxxx xxxx</Typography>
          <Stack gap="10px" direction="row">
            <Typography>{payment.card.name}</Typography>
            <Divider 
              orientation="vertical" 
              flexItem 
              sx={{
                my: "2px",
                borderColor: grey[500]
              }} 
            />
            <Typography>exp. {payment.card.exp}</Typography>
          </Stack>
          <Stack direction="row" gap="10px">
            <Link onClick={() => handleTogglePaymentMethodMode(payment.id, true)}>Edit</Link>
            <Divider 
              orientation="vertical" 
              flexItem 
              sx={{
                my: "5px",
                borderColor: grey[500]
              }} 
            />
            <Link onClick={(e) => [e.stopPropagation(), handleDeletePaymentMethod(payment)]}>Delete</Link>
          </Stack>
          <TextField 
            type="password"
            label="CVC"  
            value={payment.card.cvc}
            inputProps={{ maxLength: 3 }}
            autoComplete="off"
            onChange = {(e) => handleChangCardCVC(e.target.value)}
          />
        </Stack>
      )}
    </Stack>
  );
});

export const PaymentInfo = ({selected}: {selected: PAYMENT}) => {
  const dispatch = useAppDispatch();
  const payments = useAppSelector(getPayments);
  const [showNewPayment, setShowNewPayment] = useState<boolean>(selected.isNew ? true : false);

  const handleAddNewPayment = useCallback(
    () => {
      setShowNewPayment(true);
      dispatch(selectPaymentMethod(payments[payments.length - 1].id));
    }, [payments]
  );

  return (
    <React.Fragment>
      <Stack 
        direction="row" 
        alignItems="center" 
        justifyContent="space-between"
      >
        <Typography 
          variant="h3" 
          display="flex" 
          alignItems="center" 
          gap="10px"
        >
          Payment
          {validatePaymentMethod(selected) ? <CheckCircleOutline color="success" fontSize="large" /> : <ErrorOutlineOutlined color="warning" fontSize="large" />}
        </Typography>
      </Stack>
      <Box py={1}>
        {payments.map((payment: PAYMENT) => payment.isNew && !showNewPayment
          ? null
          : <Payment 
              key={`payment${payment.id}-${payment.isNew ? '1' : '2'}`}
              isSelected={payment.id === selected.id}
              payment={payment.id === selected.id ? selected : payment} 
              hideDelete={payments.length === 1}
              handleSetShowNewPayment={setShowNewPayment}
            />
        )} 
        {!showNewPayment && (
          <Stack 
            direction="row" 
            alignItems="center"
            gap="10px"
          >
            <Add fontSize="large" sx={{color: blue[800], width: "42px"}} />
            <Stack direction="row" alignItems="center">
              <CreditCard fontSize="large" sx={{color: grey[800]}} />
              <Button size="large" onClick={handleAddNewPayment}>Add New Card</Button>
            </Stack>
          </Stack>
        )}
      </Box>
    </React.Fragment>
  )
}