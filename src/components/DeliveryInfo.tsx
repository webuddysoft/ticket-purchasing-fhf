import React, { useState } from "react";
import { 
  Box, 
  Button, 
  Radio, 
  Stack, 
  Typography 
} from "@mui/material";
import { useAppDispatch } from "../app/hooks";
import { formatCurrency, getDeliveryMethod } from "../app/lib";
import { DELIVERY } from "../types";
import { updateDeliveryMethod } from "../app/ticketSlice";
import { CheckCircleOutline } from "@mui/icons-material";
import { DeliveryMethods } from "../data";
import { blue } from "@mui/material/colors";

const Delivery = ({method}: {method: DELIVERY}) => {
  return (
    <Box py={1}>
      <Typography variant="h4">
        {`${method.name} - ${method.price > 0 ? formatCurrency(method.price) : 'Free'}`}
      </Typography>
      <Typography variant="body1">{method.description}</Typography>
    </Box>
  )
}

export const DeliveryInfo = ({selectedId}: {selectedId: number | null}) => {
  const dispatch = useAppDispatch();
  const [isChange, setIsChange] = useState<boolean>(false);
  const handleChangeMethod = (delivery: DELIVERY) => {
    dispatch(updateDeliveryMethod(delivery.id));
  }
  const selectedMethod = getDeliveryMethod(selectedId);
  
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
          Delivery
          {selectedMethod && <CheckCircleOutline color="success" fontSize="large" />}
        </Typography>
        <Button onClick={() => setIsChange((prev) => !prev)}>{isChange ? 'Close' : 'Change'}</Button>
      </Stack>
      {(selectedMethod && !isChange) && <Delivery method={selectedMethod} />}
      <Stack display={isChange ? 'flex' : 'none'}>
        {DeliveryMethods.map((delivery) => (
          <Stack 
            key={`delivery${delivery.id}`}
            direction="row" 
            alignItems="flex-start"
            my={1}
            borderRadius={1}
            sx={{
              cursor: "pointer",
              border: 1,
              backgroundColor: delivery.id === selectedMethod?.id ? blue[50] : "transparent",
              borderColor: delivery.id === selectedMethod?.id ? blue[200] : "transparent"
            }}
            onClick={() => handleChangeMethod(delivery)}
          >
            <Radio 
              checked={delivery.id === selectedMethod?.id}
              name="delivery_method"
              value={delivery.id} 
            />
            <Delivery method={delivery} />
          </Stack>
        ))}
      </Stack>
    </React.Fragment>
  )
}