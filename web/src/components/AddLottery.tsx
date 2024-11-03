import React from 'react';
import { Box, Modal, Stack, TextField, Typography } from '@mui/material';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import { useState } from 'react';
import { LoadingButton } from '@mui/lab';
import { useNotifications } from '@toolpad/core';

type eventTarget = React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>;

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

const baseUrl = 'http://localhost:3000';
interface AddLotteryProps {
  fetchLotteries: () => Promise<void>;
}

function AddLottery({ fetchLotteries }: AddLotteryProps) {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState('');
  const [prize, setPrize] = useState('');
  const [nameErr, setNameErr] = useState(false);
  const [prizeErr, setPrizeErr] = useState(false);
  const [formLoading, setFormLoading] = useState(false);

  const notifications = useNotifications();

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const isSubmitDisabled = prizeErr || nameErr || prize === '' || name === '';

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setFormLoading(true);
    try {
      void fetch(`${baseUrl}/lotteries`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          type: 'simple',
          name: name,
          prize: prize,
        }),
      });
      fetchLotteries();
      notifications.show('New lottery added', {
        severity: 'success',
        autoHideDuration: 3000,
      });
    } catch (error) {
      console.error(error);
      notifications.show('Lottery could not be added', {
        severity: 'error',
        autoHideDuration: 3000,
      });
    } finally {
      setFormLoading(false);
      handleClose();
    }
  }
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
    setPrize(value);
    if (value.length < 4) {
      setPrizeErr(true);
    } else {
      setPrizeErr(false);
    }
  }

  return (
    <>
      <AddLotteryButton variant="contained" onClick={handleOpen}>
        + ADD LOTTERY
      </AddLotteryButton>
      <Modal open={open} onClose={handleClose}>
        <Box sx={style}>
          <Typography variant="h6" component={'h2'}>
            Add a new lottery
          </Typography>

          <form onSubmit={handleSubmit}>
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

              <LoadingButton
                sx={{ width: '60px' }}
                type="submit"
                variant="contained"
                disabled={isSubmitDisabled}
                loading={formLoading}
              >
                Add
              </LoadingButton>
            </Stack>
          </form>
        </Box>
      </Modal>
    </>
  );
}

export default AddLottery;
