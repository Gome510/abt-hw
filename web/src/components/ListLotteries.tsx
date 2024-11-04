import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import SyncIcon from '@mui/icons-material/Sync';
import { type Lottery } from '../../../backend/types';
import { Box, CardActions, IconButton, Typography } from '@mui/material';
import CardActionArea from '@mui/material/CardActionArea';

interface ListLotteriesProps {
  lotteries: Lottery[];
  selectedLotteries: { [key: string]: boolean };
  handleSelect: (id: string) => void;
}
function ListLotteries({
  lotteries,
  selectedLotteries,
  handleSelect,
}: ListLotteriesProps) {
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
        ? lotteries.map((lottery) => (
            <LotteryCard
              selected={selectedLotteries[lottery.id]}
              lottery={lottery}
              handleSelect={handleSelect}
            />
          ))
        : 'ListLotteries'}
    </Box>
  );
}

export default ListLotteries;

interface LotteryCardProps {
  lottery: Lottery;
  selected: boolean;
  handleSelect: (id: string) => void;
}
function LotteryCard({ lottery, selected, handleSelect }: LotteryCardProps) {
  const cardStyle = {
    minWidth: 300,
    maxWidth: 300,
    position: 'relative',
    ...(selected && { outline: '2px solid black' }),
  };

  return (
    <Card sx={cardStyle}>
      {/* <CardActions>
        <IconButton color="inherit">
          <SyncIcon />
        </IconButton>
      </CardActions> */}
      <CardActionArea onClick={() => handleSelect(lottery.id)}>
        <CardContent>
          <Typography variant="h5" align="left">
            {lottery.name}
          </Typography>
          <Typography align="left"> {lottery.prize} </Typography>
          <Typography align="left"> {lottery.id} </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
