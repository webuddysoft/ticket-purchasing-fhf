import { 
  Box, 
  Container, 
  Stack, 
  Typography 
} from "@mui/material"
import { blue } from "@mui/material/colors"

export const Nav = () => {
  return (
    <Box component="nav" bgcolor={blue[800]} sx={{py: 1.5}}> 
      <Container maxWidth="lg">
        <Stack 
          direction="row" 
          justifyContent="space-between" 
          alignItems="center"
        >
          <Typography variant='h2' color="white">Ticket Purchasing</Typography>
          <Typography variant='subtitle2' color="white" textAlign="right">
            Assessment - Firt Help Finanacial LLC
          </Typography>
        </Stack>
      </Container>
    </Box>
  )
}