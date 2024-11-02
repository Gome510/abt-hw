import React, { useEffect, useState } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import SyncIcon from '@mui/icons-material/Sync';
import { type Lottery } from '../../../backend/types';
import { Box, Button, IconButton, Typography } from '@mui/material';

const baseUrl = 'http://localhost:3000';
function ListLotteries() {
  const [lotteries, setLotteries] = useState<Lottery[]>([]);

  useEffect(() => {
    async function fetchLotteries() {
      try {
        const response = await fetch(`${baseUrl}/lotteries`);
        const data = (await response.json()) as Lottery[];
        setLotteries(data);
      } catch (error) {
        console.error(error);
      }
    }

    void fetchLotteries();
  }, []);

  return (
    //TODO: Responsive column count
    <Box maxWidth={900}>
      {lotteries
        ? lotteries.map((lottery) => <LotteryCard lottery={lottery} />)
        : 'ListLotteries'}
    </Box>
  );
}

export default ListLotteries;

interface LotteryCardProps {
  lottery: Lottery;
}
function LotteryCard({ lottery }: LotteryCardProps) {
  return (
    <Card sx={{ width: 400 }}>
      <CardContent sx={{ position: 'relative' }}>
        <IconButton
          color="inherit"
          sx={{ position: 'absolute', right: '1rem' }}
        >
          <SyncIcon />
        </IconButton>
        <Typography variant="h5" align="left">
          {lottery.name}
        </Typography>
        <Typography align="left"> {lottery.prize} </Typography>
        <Typography align="left"> {lottery.id} </Typography>
      </CardContent>
    </Card>
  );
}
