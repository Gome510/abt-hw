import { RouteProp } from '@react-navigation/native';
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
  Register: { selectedLotteries: Array<string> };
};

export type AddLotteryNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'AddLottery',
  'Register'
>;

export type AddLotteryFormValues = {
  name: string;
  prize: string;
};

export type RegisterNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'Register'
>;

export type RegisterScreenRouteProp = RouteProp<RootStackParamList, 'Register'>;
