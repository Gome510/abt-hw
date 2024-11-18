import { NativeStackNavigationProp } from '@react-navigation/native-stack';

export type Status = 'running' | 'finished';

export interface Lottery {
  id: string;
  name: string;
  prize: string;
  type: string;
  status: Status;
}

export type RootStackParamList = {
  Home: undefined;
  AddLottery: undefined;
};

export type AddLotteryNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'AddLottery'
>;

export type AddLotteryFormValues = {
  name: string;
  prize: string;
};
