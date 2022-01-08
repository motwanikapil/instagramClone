import React from 'react'
import { StatusBar, StyleSheet, Text, View } from 'react-native'
import HomeScreen from './screens/HomeScreen'
import SignedInStack from './screens/navigation'
import NewPostScreen from './screens/NewPostScreen'

export default function App() {
  return (
    <>
      <StatusBar backgroundColor={'#000'} animated />
      <SignedInStack />
    </>
  )
}
