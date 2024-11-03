import { useEffect, useState } from 'react';
import { Box, Container, Typography } from '@mui/material';
import CasinoIcon from '@mui/icons-material/Casino';
import AddLottery from './components/AddLottery';
import ListLotteries from './components/ListLotteries';
import { type Lottery } from '../../backend/types';
import './App.css';

const baseUrl = 'http://localhost:3000';

function App() {
  const [lotteries, setLotteries] = useState<Lottery[]>([]);

  async function fetchLotteries() {
    try {
      const response = await fetch(`${baseUrl}/lotteries`);
      const data = (await response.json()) as Lottery[];
      setLotteries(data);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    void fetchLotteries();
  }, []);

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
        <ListLotteries lotteries={lotteries} />
        <AddLottery fetchLotteries={fetchLotteries} />
      </Box>
    </Container>
  );
}

export default App;
