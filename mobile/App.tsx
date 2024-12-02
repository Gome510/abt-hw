import { createStaticNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ToastProvider } from 'react-native-toast-notifications';
import HomeScreen from './screens/HomeScreen';
import AddLotteryScreen from './screens/AddLotteryScreen';
import RegisterModal from './screens/RegisterModal';

const RootStack = createNativeStackNavigator({
  screens: {
    Home: HomeScreen,
    AddLottery: AddLotteryScreen,
    Register: {
      screen: RegisterModal,
      options: {
        presentation: 'modal',
      },
    },
  },
  screenOptions: {
    headerShown: false,
    contentStyle: {
      paddingTop: 40,
      backgroundColor: 'white',
    },
  },
});

const Navigation = createStaticNavigation(RootStack);

export default function App() {
  return (
    <ToastProvider>
      <Navigation />
    </ToastProvider>
  );
}
