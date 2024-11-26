import { View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useToast } from 'react-native-toast-notifications';
import { AddLotteryNavigationProp, AddLotteryFormValues } from '../types';
import LotteryForm from '../components/Form';

const AddLotteryScreen = () => {
  const navigation = useNavigation();
  const toast = useToast();

  function onSubmit() {
    navigation.goBack();
    toast.show('New lottery added successfully!');
  }

  return (
    <View>
      <LotteryForm onSubmit={onSubmit} />
    </View>
  );
};

export default AddLotteryScreen;
