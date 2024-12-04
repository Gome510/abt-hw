import { StyleSheet, Text, View } from 'react-native';
import React, { ReactElement } from 'react';
import { Lottery } from '../types';

const renderTextRow = (title: string, value: string): ReactElement => {
  const prefix = `${title}: `;
  return (
    <View style={styles.textRow}>
      <Text>
        {prefix}
        <Text style={styles.boldText}>{value}</Text>
      </Text>
    </View>
  );
};

interface LotteryDetailsViewProps {
  lottery: Lottery;
}

const LotteryDetailsView = ({ lottery }: LotteryDetailsViewProps) => {
  const { id, name, prize, status, type } = lottery;
  return (
    <View style={styles.container}>
      <Text style={styles.titleText}>{name}</Text>
      {renderTextRow('ID', id)}
      {renderTextRow('Price', prize)}
      {renderTextRow('Status', status)}
      {renderTextRow('Type', type)}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  textRow: {
    //text
  },
  titleText: {
    //
  },
  boldText: {
    //
  },
});

export default LotteryDetailsView;
