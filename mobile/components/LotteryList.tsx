import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  useWindowDimensions,
  TextInput,
} from 'react-native';
import React, { useState } from 'react';
import Ionicons from '@expo/vector-icons/Ionicons';
import { StyleSheet } from 'react-native';
import { Lottery } from '../types';
import { colors } from '../colors';

type Props = {
  lotteries: Lottery[];
  loading: boolean;
};

export default function LotteryList({ lotteries, loading }: Props) {
  const [filter, setFilter] = useState('');
  const { width } = useWindowDimensions();
  if (loading) return <ActivityIndicator size={'large'} />;

  const filteredLotteries = lotteries.filter((lottery) =>
    lottery.name.includes(filter),
  );

  return (
    <View style={{ width: width - 24, flex: 1 }}>
      <View style={styles.filterContainer}>
        <TextInput
          style={styles.filter}
          placeholder="Filter lotteries"
          onChangeText={setFilter}
        />
        <Ionicons name="search" size={24} color="black" />
      </View>
      {filteredLotteries.length > 0 ? (
        <FlatList
          data={filter ? filteredLotteries : lotteries}
          renderItem={LotteryItem}
        />
      ) : (
        <Text style={styles.noResult}>No search results for `{filter}`</Text>
      )}
    </View>
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
  filter: {
    flex: 1,
    height: 40,
    fontSize: 16,
    paddingRight: 10,
  },
  filterContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 24,
    marginHorizontal: 40,
    borderWidth: 1,
    borderRadius: 4,
    borderColor: colors.grey,
    backgroundColor: colors.secondary,
    paddingHorizontal: 23,
  },
  noResult: {
    color: 'black',
    fontSize: 24,
    textAlign: 'center',
  },
});
