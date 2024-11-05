import { useEffect, useState } from 'react';
import { Box, Container, Typography } from '@mui/material';
import CasinoIcon from '@mui/icons-material/Casino';
import { OutlinedInput } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import AddLottery from './components/AddLottery';
import ListLotteries from './components/ListLotteries';
import { type Lottery } from '../../backend/types';
import './App.css';
import Register from './components/Register';

const baseUrl = 'http://localhost:3000';

type eventTarget = React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>;

function App() {
  const [lotteries, setLotteries] = useState<Lottery[]>([]);
  const [selectedLotteries, setSelectedLotteries] = useState<{
    [id: string]: boolean;
  }>({});
  const [search, setSearch] = useState('');

  async function fetchLotteries() {
    try {
      const response = await fetch(`${baseUrl}/lotteries`);
      const data = (await response.json()) as Lottery[];
      setLotteries(data);
    } catch (error) {
      console.error(error);
    }
  }

  function handleSelect(id: string) {
    setSelectedLotteries((prev) => {
      if (!prev[id]) {
        return { ...prev, [id]: true };
      }
      const { [id]: _, ...rest } = prev;
      return rest;
    });
  }

  function handleSearchChange(e: eventTarget) {
    setSearch(e.target.value);
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
        <OutlinedInput
          sx={{ marginY: 4, minWidth: 400 }}
          placeholder="Search"
          defaultValue={search}
          onChange={handleSearchChange}
          endAdornment={<SearchIcon />}
        />
        <ListLotteries
          lotteries={lotteries}
          handleSelect={handleSelect}
          selectedLotteries={selectedLotteries}
          search={search}
        />
        <AddLottery fetchLotteries={fetchLotteries} />
        <Register
          fetchLotteries={fetchLotteries}
          lotteries={lotteries}
          selectedLotteries={selectedLotteries}
        />
      </Box>
    </Container>
  );
}

export default App;
