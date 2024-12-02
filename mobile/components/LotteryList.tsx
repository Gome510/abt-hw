import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  useWindowDimensions,
  TextInput,
  Pressable,
  Button,
} from 'react-native';
import React, { useRef, useState } from 'react';
import Ionicons from '@expo/vector-icons/Ionicons';
import { StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Lottery, RegisterNavigationProp } from '../types';
import { colors } from '../colors';

type Props = {
  lotteries: Lottery[];
  loading: boolean;
  registeredLotteries: string[];
};

export default function LotteryList({
  lotteries,
  loading,
  registeredLotteries,
}: Props) {
  if (loading) return <ActivityIndicator size={'large'} />;

  const { navigate } = useNavigation<RegisterNavigationProp>();
  const [filter, setFilter] = useState('');
  const selected = useRef<{ [key: string]: boolean }>({});
  const [registerButtonVisible, setRegisterButtonVisible] = useState(false);
  const { width } = useWindowDimensions();

  const handleSelect = (id: string) => {
    if (selected.current[id]) {
      delete selected.current[id];
    } else {
      selected.current[id] = true;
    }
    setRegisterButtonVisible(Object.keys(selected.current).length > 0);
  };

  const handleRegister = () => {
    navigate('Register', { selectedLotteries: Object.keys(selected.current) });
  };

  const filteredLotteries = lotteries.filter((lottery) =>
    lottery.name.includes(filter),
  );

  return (
    <View style={{ width: width - 24, flex: 1 }}>
      {registerButtonVisible ? (
        <Button title="Register" onPress={handleRegister} />
      ) : null}
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
          renderItem={({ item }) => {
            const registered = registeredLotteries?.includes(item.id);
            return (
              <LotteryItem
                item={item}
                handleSelect={handleSelect}
                registered={registered}
              />
            );
          }}
        />
      ) : (
        <Text style={styles.noResult}>No search results for `{filter}`</Text>
      )}
    </View>
  );
}

function LotteryItem({
  item,
  handleSelect,
  registered,
}: {
  item: Lottery;
  handleSelect: (id: string) => void;
  registered?: boolean;
}) {
  const [selected, setSelected] = useState(false);
  const styleContainer = {
    ...styles.container,
    borderColor: selected ? 'blue' : colors.borderColor,
    backgroundColor:
      item.status !== 'running' || registered ? '#E0E0E0' : 'white',
  };

  return (
    <Pressable
      style={styleContainer}
      onPress={() => {
        handleSelect(item.id);
        setSelected((prev) => !prev);
      }}
      disabled={item.status !== 'running' || registered}
    >
      <Text style={styles.name}>{item.name}</Text>
      <Text style={styles.prize}>{item.prize}</Text>
      <Text style={styles.id}>{item.id}</Text>
    </Pressable>
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
