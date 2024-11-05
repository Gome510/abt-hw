import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import SyncIcon from '@mui/icons-material/Sync';
import { type Lottery } from '../../../backend/types';
import { Box, Typography } from '@mui/material';
import CardActionArea from '@mui/material/CardActionArea';

interface ListLotteriesProps {
  lotteries: Lottery[];
  selectedLotteries: { [key: string]: boolean };
  handleSelect: (id: string) => void;
  search: string;
}
function ListLotteries({
  lotteries,
  selectedLotteries,
  handleSelect,
  search,
}: ListLotteriesProps) {
  const filteredLotteries = lotteries.filter((lottery) =>
    lottery.name.toLowerCase().includes(search.toLowerCase()),
  );
  return (
    <Box
      sx={{
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center',
        maxWidth: 950,
        gap: 2,
      }}
    >
      {filteredLotteries.length > 0 ? (
        filteredLotteries.map((lottery) => (
          <LotteryCard
            selected={selectedLotteries[lottery.id]}
            lottery={lottery}
            handleSelect={handleSelect}
          />
        ))
      ) : (
        <Typography variant="h5">
          No search results found for '{search}'
        </Typography>
      )}
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
  const lotteryRunning = lottery.status === 'running';
  const cardStyle = {
    minWidth: 300,
    maxWidth: 300,
    maxHeight: 110,
    position: 'relative',
    ...(selected && { outline: '2px solid black' }),
    ...(!lotteryRunning && { opacity: 0.5 }),
  };

  return (
    <Card sx={cardStyle}>
      {lotteryRunning ? (
        <CardActionArea onClick={() => handleSelect(lottery.id)}>
          <CardContent>
            <SyncIcon sx={{ position: 'absolute', right: 10 }} />
            <Typography variant="h5" align="left">
              {lottery.name}
            </Typography>
            <Typography align="left"> {lottery.prize} </Typography>
            <Typography align="left"> {lottery.id} </Typography>
          </CardContent>
        </CardActionArea>
      ) : (
        <CardContent>
          <Typography variant="h5" align="left">
            {lottery.name}
          </Typography>
          <Typography align="left"> {lottery.prize} </Typography>
          <Typography align="left"> {lottery.id} </Typography>
        </CardContent>
      )}
    </Card>
  );
}
