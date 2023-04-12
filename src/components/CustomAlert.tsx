import { Alert, Snackbar } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { getAlertInfo, hideAlert } from "../app/alertSlice";

const CustomAlert = () => {
  const dispatch = useAppDispatch();
  const {type, message, open} = useAppSelector(getAlertInfo);
  const handleClose = () => {
    dispatch(hideAlert());
  }
  return (
    <Snackbar 
      open={open} 
      anchorOrigin={{vertical: "top", horizontal:"center"}} 
      autoHideDuration={3000} 
      onClose={handleClose}
    >
      <Alert 
        onClose={handleClose} 
        variant="filled"
        severity={type}
      >
        {message}
      </Alert>
    </Snackbar>
  )
}

export default CustomAlert;