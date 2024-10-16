import { Box, Modal, Stack, TextField, Typography } from '@mui/material';
import './App.css';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import { useState } from 'react';

const AddLotteryButton = styled(Button)({
  borderRadius: '9999px',
  position: 'absolute',
  bottom: '20px',
  right: '20px',
});

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

function App() {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState('');
  const [prize, setPrize] = useState('');
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div>
      <AddLotteryButton variant="contained" onClick={handleOpen}>
        + ADD LOTTERY
      </AddLotteryButton>
      <Modal open={open} onClose={handleClose}>
        <Box sx={style}>
          <Typography variant="h6" component={'h2'}>
            Add a new lottery
          </Typography>

          <form>
            <Stack spacing={2}>
              <TextField variant="standard" label="Lottery name" required />
              <TextField variant="standard" label="Lottery prize" required />

              <Button sx={{ width: '60px' }} type="submit" variant="contained">
                Add
              </Button>
            </Stack>
          </form>
        </Box>
      </Modal>
    </div>
  );
}

export default App;
