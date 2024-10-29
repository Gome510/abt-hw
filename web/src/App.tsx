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

type eventTarget = React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>;

function App() {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState('');
  const [prize, setPrize] = useState('');
  const [nameErr, setNameErr] = useState(false);
  const [prizeErr, setPrizeErr] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  function handleNameChange(e: eventTarget) {
    const value = e.target.value;
    setName(value);
    if (value.length < 4) {
      setNameErr(true);
    } else {
      setNameErr(false);
    }
  }
  function handlePrizeChange(e: eventTarget) {
    const value = e.target.value;
    setName(value);
    if (value.length < 4) {
      setPrizeErr(true);
    } else {
      setPrizeErr(false);
    }
  }

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
              <TextField
                variant="standard"
                label="Lottery name"
                onChange={(e) => handleNameChange(e)}
                error={nameErr}
                defaultValue={name}
                helperText={
                  nameErr && 'Name must be at least 4 characters long'
                }
                required
              />
              <TextField
                variant="standard"
                label="Lottery prize"
                onChange={(e) => handlePrizeChange(e)}
                error={prizeErr}
                defaultValue={prize}
                helperText={
                  prizeErr && 'Prize must be at least 4 characters long'
                }
                required
              />

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
