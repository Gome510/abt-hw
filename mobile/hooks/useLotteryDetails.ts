import { useState } from 'react';
import { Lottery } from '../types';
import { getLotteryById } from '../services/lottery';

export async function useLotteryDetails(id: string) {
  const [lottery, setLottery] = useState<Lottery | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>();

  async function fetchLottery() {
    setLoading(true);
    setError(undefined);

    try {
      const lottery = await getLotteryById(id);
      setLottery(lottery);
      setLoading(false);
    } catch (error: any) {
      setLoading(false);
      setError(error.message);
    }
  }

  return {
    data: lottery,
    loading,
    error,
    fetchLottery,
  };
}
