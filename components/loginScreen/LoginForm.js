import React, { useState } from 'react'
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Pressable,
  TouchableOpacity,
  Alert,
} from 'react-native'
import { Formik } from 'formik'
import * as Yup from 'yup'
import * as Validator from 'email-validator'
import { firebase } from '../../firebase'

const LoginForm = ({ navigation }) => {
  const loginFormSchema = Yup.object().shape({
    email: Yup.string().email().required('An Email is Required'),
    password: Yup.string()
      .required()
      .min(6, 'Your password has to be atleast 6 characters'),
  })

  const onLogin = async (email, password) => {
    try {
      await firebase.auth().signInWithEmailAndPassword(email, password)
      console.log('Firebase login successful', email, password)
    } catch (error) {
      Alert.alert(
        'My Lord ...',
        error.message + '\n\n ... What would you like to do next',
        [
          {
            text: 'Ok',
            onPress: () => console.log('Ok'),
            style: 'cancel',
          },
          {
            text: 'Sign Up',
            onPress: () => navigation.push('SignupScreen'),
          },
        ]
      )
    }
  }

  // The above is the cool functionality Alert.alert has
  // Syntax : Alert.alert(MainTitle, Message, Button or Can be Array of Buttons to show at bottom)
  return (
    <View style={styles.wrapper}>
      <Formik
        initialValues={{ email: '', password: '' }}
        onSubmit={(values) => {
          onLogin(values.email, values.password)
        }}
        validationSchema={loginFormSchema}
        validateOnMount={true}
      >
        {({ handleChange, handleBlur, handleSubmit, values, isValid }) => {
          return (
            <>
              <View
                style={[
                  styles.inputField,
                  {
                    borderColor:
                      values.email.length < 1 ||
                      Validator.validate(values.email)
                        ? '#ccc'
                        : '#ff0000',
                  },
                ]}
              >
                <TextInput
                  placeholderTextColor={'#444'}
                  placeholder='Phone Number, username or email'
                  autoCapitalize='none'
                  keyboardType='email-address'
                  textContentType='emailAddress'
                  onChangeText={handleChange('email')}
                  onBlur={handleBlur('email')}
                  value={values.email}
                />
              </View>
              <View
                style={[
                  styles.inputField,
                  {
                    borderColor:
                      values.email.length < 1 || values.password.length >= 6
                        ? '#ccc'
                        : '#ff0000',
                  },
                ]}
              >
                <TextInput
                  placeholderTextColor={'#444'}
                  placeholder='Password'
                  autoCapitalize='none'
                  autoCorrect={false}
                  secureTextEntry
                  textContentType='password'
                  onChangeText={handleChange('password')}
                  onBlur={handleBlur('password')}
                  value={values.password}
                />
              </View>
              <View style={{ alignItems: 'flex-end', marginBottom: 30 }}>
                <Text style={{ color: '#6BB0F5' }}>Forgot password?</Text>
              </View>
              <Pressable
                titleSize={20}
                style={styles.button(isValid)}
                onPress={handleSubmit}
                disabled={!isValid}
              >
                <Text style={styles.buttonText}>Log In</Text>
              </Pressable>
              <View style={styles.signupContainer}>
                <Text>Don't have an account?</Text>
                <TouchableOpacity
                  onPress={() => navigation.push('SignupScreen')}
                >
                  <Text style={{ color: '#6BB0F5' }}> Sign Up</Text>
                </TouchableOpacity>
              </View>
            </>
          )
        }}
      </Formik>
    </View>
  )
}

const styles = StyleSheet.create({
  wrapper: {
    marginTop: 80,
  },
  inputField: {
    borderRadius: 4,
    padding: 12,
    backgroundColor: '#FAFAFA',
    marginBottom: 10,
    borderWidth: 1,
  },
  button: (isValid) => ({
    backgroundColor: isValid ? '#0096F6' : '#9ACAF7',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 42,
    borderRadius: 4,
  }),
  buttonText: {
    fontWeight: '600',
    color: '#fff',
    fontSize: 20,
  },
  signupContainer: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'center',
    marginTop: 50,
  },
})

export default LoginForm
