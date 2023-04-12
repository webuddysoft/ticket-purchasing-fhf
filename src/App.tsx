import { Box } from '@mui/material';
import { useAppSelector } from './app/hooks';
import { getCart } from './app/ticketSlice';
import { Checkout } from './components/Checkout';
import CustomAlert from './components/CustomAlert';
import { Nav } from './components/Nav';
import { Shows } from './components/Shows';
import { CART } from './types';

function App() {
  const cart: CART | null = useAppSelector(getCart);
  return (
    <Box>
      <Nav />
      <Box component="main" sx={{py: 3}}>
        {cart === null ? <Shows /> : <Checkout />}
      </Box>
      <CustomAlert />
    </Box>
  );
}

export default App;
