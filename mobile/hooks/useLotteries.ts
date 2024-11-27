import { useEffect, useState } from 'react';
import { Lottery } from '../types';
import { getLottieries } from '../services/lottery';

export default function useLotteries() {
  const [lotteries, setLotteries] = useState<Lottery[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();

  async function fetchLotteries() {
    setLoading(true);
    setError(undefined);
    try {
      const lotteryList = await getLottieries();
      setLoading(false);
      setLotteries(lotteryList);
    } catch (error: any) {
      setLoading(false);
      setError(error.message);
    }
  }

  useEffect(() => {
    fetchLotteries();
  }, []);

  return {
    lotteries,
    loading,
    error,
    fetchLotteries,
  };
}
