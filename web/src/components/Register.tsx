import React from 'react';
import { Box, Modal, Stack, TextField, Typography } from '@mui/material';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import { useState } from 'react';
import { LoadingButton } from '@mui/lab';
import { useNotifications } from '@toolpad/core';
import { Lottery } from '../../../backend/types';
import { isEmptyObj } from '../utils';

type eventTarget = React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>;

const RegisterButton = styled(Button)({
  borderRadius: '9999px',
  position: 'absolute',
  bottom: '20px',
  right: '170px',
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
interface RegisterProps {
  fetchLotteries: () => Promise<void>;
  lotteries: Lottery[];
  selectedLotteries: { [id: string]: boolean };
}

function Register({
  fetchLotteries,
  lotteries,
  selectedLotteries,
}: RegisterProps) {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState('');
  const [nameErr, setNameErr] = useState(false);
  const [formLoading, setFormLoading] = useState(false);

  const notifications = useNotifications();

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const isSubmitDisabled = nameErr || name === '';

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setFormLoading(true);
    let response = null;
    for (const lottery of lotteries) {
      if (selectedLotteries[lottery.id]) {
        try {
          response = await fetch(`${baseUrl}/register`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              lotteryId: lottery.id,
              name: name,
            }),
          });
          void fetchLotteries();
        } catch (error) {
          console.error(error);
        } finally {
          if (response && response.ok) {
            notifications.show(
              'Successfully egistered for lottery:' + lottery.name,
              {
                severity: 'success',
                autoHideDuration: 3000,
              },
            );
          } else {
            notifications.show(
              'Could not register for lottery: ' + lottery.name,
              {
                severity: 'error',
                autoHideDuration: 3000,
              },
            );
          }
        }
      }
    }
    setFormLoading(false);
    handleClose();
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

  return (
    <>
      <RegisterButton
        variant="contained"
        color="inherit"
        onClick={handleOpen}
        disabled={isEmptyObj(selectedLotteries)}
      >
        REGISTER
      </RegisterButton>
      <Modal open={open} onClose={handleClose}>
        <Box sx={style}>
          <Typography variant="h6" component={'h2'}>
            Register for a lottery
          </Typography>

          <form onSubmit={void handleSubmit}>
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
export default Register;
