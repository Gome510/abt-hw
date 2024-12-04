import { StyleSheet } from 'react-native';
import React from 'react';
import { useRoute } from '@react-navigation/native';
import LotteryDetailsDataProvider from '../providers/DataProvider';
import { LotteryDetailsRouteProp } from '../types';
import LotteryDetailsView from '../components/LotteryDetailsView';
import { ErrorBoundary } from '../components/ErrorBoundary';
import { LotteryDetailsError } from '../components/LotteryDetailsError';

const fallback = <LotteryDetailsError />;

export default function LotteryDetails() {
  const route = useRoute<LotteryDetailsRouteProp>();

  return (
    <ErrorBoundary fallback={fallback}>
      <LotteryDetailsDataProvider lotteryId={route.params.id}>
        {(lotteryDetails) => <LotteryDetailsView lottery={lotteryDetails} />}
      </LotteryDetailsDataProvider>
    </ErrorBoundary>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
