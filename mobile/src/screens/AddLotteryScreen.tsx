import { View, Text, TextInput, Pressable, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useForm, Controller } from 'react-hook-form';
import { AddLotteryNavigationProp, AddLotteryFormValues } from '../../types';

const AddLotteryScreen = () => {
  const { control, handleSubmit } = useForm({
    defaultValues: {
      name: '',
      prize: '',
    },
  });
  function onSubmit(data: AddLotteryFormValues) {
    console.log(data);
  }

  return (
    <View>
      <Controller
        control={control}
        rules={{ required: true, minLength: 4 }}
        render={({ field: { onChange, value } }) => (
          <TextInput placeholder="Name" onChangeText={onChange} value={value} />
        )}
        name="name"
      />
      <Controller
        control={control}
        rules={{ required: true, minLength: 4 }}
        render={({ field: { onChange, value } }) => (
          <TextInput
            placeholder="Prize"
            onChangeText={onChange}
            value={value}
          />
        )}
        name="prize"
      />

      <Pressable onPress={handleSubmit(onSubmit)}>
        <Text>Submit</Text>
      </Pressable>
    </View>
  );
};

export default AddLotteryScreen;
