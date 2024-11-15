import { createStaticNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './src/screens/HomeScreen';
import AddLotteryScreen from './src/screens/AddLotteryScreen';

const RootStack = createNativeStackNavigator({
  screens: {
    Home: HomeScreen,
    AddLottery: AddLotteryScreen,
  },
});

const Navigation = createStaticNavigation(RootStack);

export default function App() {
  return <Navigation />;
}
