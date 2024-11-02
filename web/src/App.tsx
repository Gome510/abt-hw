import { Box, Container, Typography } from '@mui/material';
import CasinoIcon from '@mui/icons-material/Casino';
import AddLottery from './components/AddLottery';
import ListLotteries from './components/ListLotteries';
import './App.css';

function App() {
  return (
    <Container>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Typography variant="h1">
          Lotteries{' '}
          <CasinoIcon fontSize="inherit" sx={{ verticalAlign: 'middle' }} />
        </Typography>
        <ListLotteries />
        <AddLottery />
      </Box>
    </Container>
  );
}

export default App;
