import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import SyncIcon from '@mui/icons-material/Sync';
import { type Lottery } from '../../../backend/types';
import { Box, IconButton, Typography } from '@mui/material';

interface ListLotteriesProps {
  lotteries: Lottery[];
}
function ListLotteries({ lotteries }: ListLotteriesProps) {
  return (
    //TODO: Responsive column count
    <Box
      sx={{
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center',
        maxWidth: 950,
        gap: 2,
      }}
    >
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
    <Card sx={{ minWidth: 300, maxWidth: 300 }}>
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
