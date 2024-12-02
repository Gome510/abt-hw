import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  Pressable,
  TextInput,
} from 'react-native';
import React from 'react';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { useNavigation, useRoute } from '@react-navigation/native';
import { colors } from '../colors';
import useRegisterLottery from '../hooks/useRegisterLottery';
import { RegisterScreenRouteProp } from '../types';

const registerSchema = Yup.object({
  name: Yup.string().required().min(4),
});

export default function RegisterModal() {
  const { loading, error, registerToLotteries } = useRegisterLottery();
  const route = useRoute<RegisterScreenRouteProp>();
  const navigation = useNavigation();

  const selectedLotteries = route.params.selectedLotteries;

  const formik = useFormik({
    validationSchema: registerSchema,
    validateOnChange: true,
    validateOnMount: true,
    initialValues: {
      name: '',
    },
    onSubmit: async (values) => {
      await registerToLotteries({
        name: values.name,
        lotteries: selectedLotteries,
      });
      navigation.goBack();
    },
  });
  const nameError = formik.errors.name;
  const nameTouched = formik.touched.name;

  const backgroundColor = !formik.isValid
    ? colors.grey
    : colors.buttonSecondary;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Register for lotteries</Text>
      <TextInput
        accessibilityLabel="Text input field"
        style={styles.input}
        placeholder="Lottery Name"
        value={formik.values.name}
        onChangeText={formik.handleChange('name')}
        onBlur={formik.handleBlur('name')}
      />
      {nameError && nameTouched && (
        <Text style={styles.error}>{nameError}</Text>
      )}

      <Pressable
        accessibilityRole="button"
        style={[styles.button, { backgroundColor }]}
        onPress={() => {
          formik.handleSubmit();
        }}
        disabled={!formik.isValid}
      >
        {loading ? (
          <ActivityIndicator />
        ) : (
          <Text style={styles.buttonText}>ADD</Text>
        )}
      </Pressable>
      {error ? <Text style={styles.error}>error</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: '500',
  },
  input: {
    marginTop: 16,
    paddingVertical: 16,
    paddingHorizontal: 10,
    borderBottomWidth: 1,
    borderBottomColor: colors.grey,
    fontSize: 16,
  },
  error: {
    fontSize: 10,
    color: colors.danger,
    paddingTop: 8,
  },
  button: {
    marginTop: 32,
    width: 64,
    borderRadius: 4,
    paddingVertical: 12,
    alignItems: 'center',
  },
  buttonText: {
    color: colors.secondary,
    fontSize: 16,
    fontWeight: '600',
  },
});
