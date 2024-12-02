import { useState } from 'react';
import { registerToLottery } from '../services/lottery';
import useAsyncStorage from './useAsyncStorage';

export default function useRegisterLottery() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();
  const { storeData } = useAsyncStorage();

  async function registerToLotteries({
    name,
    lotteries,
  }: {
    name: string;
    lotteries: Array<string>;
  }) {
    setLoading(true);
    setError(undefined);

    try {
      const registration = await Promise.all(
        lotteries.map((lotteryId) => {
          registerToLottery({ name, lotteryId });
        }),
      );
      setLoading(false);
      storeData(lotteries);
      return registration;
    } catch (error: any) {
      setLoading(false);
      setError(error.message);
      throw error;
    }
  }

  return {
    loading,
    error,
    registerToLotteries,
  };
}
