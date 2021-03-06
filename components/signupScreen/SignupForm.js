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
import { firebase, db } from '../../firebase'
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth'

const SignupForm = ({ navigation }) => {
  const SignupFormSchema = Yup.object().shape({
    email: Yup.string().required('An email is required'),
    username: Yup.string().required().min(2, 'A username is required'),
    password: Yup.string()
      .required()
      .min(6, 'Your password has to have atleast 6 characters'),
  })

  const getRandomProfilePicture = async () => {
    const response = await fetch('https://randomuser.me/api')
    const data = await response.json()
    return data.results[0].picture.large
  }

  const onSignup = async (email, password, username) => {
    try {
      const authUser = await firebase
        .auth()
        .createUserWithEmailAndPassword(email, password)
        .then(() => {
          console.log('Firebase user created successfully', email, password)
        })

      db.collection('users').add({
        owner_uid: authUser.user.uid,
        username: username,
        email: authUser.user.email,
        profile: await getRandomProfilePicture(),
      })

      console.log(db.collection('users'))
    } catch (error) {
      Alert.alert('My Lord ...', error.message)
    }
  }

  return (
    <View style={styles.wrapper}>
      <Formik
        initialValues={{ email: '', username: '', password: '' }}
        onSubmit={(values) => {
          onSignup(values.email, values.password, values.username)
        }}
        validationSchema={SignupFormSchema}
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
                {/* Email Text Input */}
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

              {/* Email Text Input Ends Here */}

              {/* Username Text Input Starts Here */}
              <View
                style={[
                  styles.inputField,
                  {
                    borderColor:
                      values.username.length < 1 || values.username.length >= 3
                        ? '#ccc'
                        : '#ff0000',
                  },
                ]}
              >
                <TextInput
                  placeholderTextColor={'#444'}
                  placeholder='Username'
                  autoCapitalize='none'
                  textContentType='username'
                  onChangeText={handleChange('username')}
                  onBlur={handleBlur('username')}
                  value={values.username}
                />
              </View>
              {/* Username Text Input Ends Here */}

              {/* Password Text Input Starts Here */}
              <View
                style={[
                  styles.inputField,
                  {
                    borderColor:
                      values.password.length < 1 || values.password.length >= 6
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
              {/* Password Text Input Ends Here */}

              <View style={{ alignItems: 'flex-end', marginBottom: 30 }}>
                <Text style={{ color: '#6BB0F5' }}>Forgot password?</Text>
              </View>
              <Pressable
                titleSize={20}
                style={styles.button(isValid)}
                onPress={handleSubmit}
                disabled={!isValid}
              >
                <Text style={styles.buttonText}>Sign Up</Text>
              </Pressable>
              <View style={styles.signupContainer}>
                <Text>Already have an account?</Text>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                  <Text style={{ color: '#6BB0F5' }}> Log In</Text>
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

export default SignupForm
