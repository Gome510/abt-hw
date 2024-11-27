import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  useWindowDimensions,
} from 'react-native';
import React, { useEffect } from 'react';
import { StyleSheet } from 'react-native';
import { Lottery } from '../types';
import { colors } from '../colors';

type Props = {
  lotteries: Lottery[];
  loading: boolean;
};

export default function LotteryList({ lotteries, loading }: Props) {
  const { width } = useWindowDimensions();
  if (loading) return <ActivityIndicator size={'large'} />;

  return (
    <FlatList
      style={{ width: width - 24 }}
      data={lotteries}
      renderItem={LotteryItem}
    />
  );
}

function LotteryItem({ item }: { item: Lottery }) {
  return (
    <View style={styles.container}>
      <Text style={styles.name}>{item.name}</Text>
      <Text style={styles.prize}>{item.prize}</Text>
      <Text style={styles.id}>{item.id}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
    borderRadius: 4,
    padding: 16,
    borderWidth: 1,
    borderColor: colors.borderColor,
  },
  iconsContainer: {
    alignSelf: 'flex-end',
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  prize: {
    fontSize: 16,
    marginBottom: 8,
  },
  id: {
    fontSize: 16,
  },
  wrapper: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 24,
    marginTop: 16,
  },
});
