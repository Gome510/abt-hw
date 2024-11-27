import { Pressable, StyleSheet, Text, View } from 'react-native';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import { useEffect } from 'react';
import { AddLotteryNavigationProp } from '../types';
import LotteryList from '../components/LotteryList';
import useLotteries from '../hooks/useLotteries';

export default function HomeScreen() {
  const { navigate } = useNavigation<AddLotteryNavigationProp>();
  const { lotteries, loading, error, fetchLotteries } = useLotteries();
  const isFocused = useIsFocused();

  useEffect(() => {
    if (isFocused) {
      fetchLotteries();
    }
  }, [isFocused]);

  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Lotteries</Text>
        <MaterialIcons size={40} name="casino" color="black" />
      </View>

      <LotteryList lotteries={lotteries} loading={loading} />
      <Pressable
        style={styles.fabButton}
        onPress={() => navigate('AddLottery')}
      >
        <Ionicons name="add" size={40} color="white" />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  title: {
    fontSize: 40,
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 8,
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 32,
  },
  fabButton: {
    position: 'absolute',
    bottom: 16,
    right: 16,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'pink',
    borderRadius: '50%',
    width: 50,
    height: 50,
  },
});
