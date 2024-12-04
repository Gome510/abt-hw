import { useEffect, useState } from 'react';
import { Lottery } from '../types';
import { getLotteryById } from '../services/lottery';

export function useLotteryDetails(id: string) {
  const [lottery, setLottery] = useState<Lottery | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>();

  async function fetchLottery(lotteryId: string) {
    setLoading(true);
    setError(undefined);

    try {
      const lottery = await getLotteryById(lotteryId);
      setLoading(false);
      setLottery(lottery);
    } catch (error: any) {
      setLoading(false);
      setError(error.message);
    }
  }

  useEffect(() => {
    fetchLottery(id);
  }, [id]);

  return {
    data: lottery,
    loading,
    error,
    fetchLottery,
  };
}
