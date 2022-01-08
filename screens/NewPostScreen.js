import React from 'react'
import { View, Text, SafeAreaView, StyleSheet } from 'react-native'
import AddNewPost from '../components/newPost/AddNewPost'
import SafeViewAndroid from '../components/SafeViewAndroid'

const NewPostScreen = ({ navigation }) => {
  return (
    <SafeAreaView
      style={
        (SafeViewAndroid.AndroidSafeArea, { backgroundColor: '#000', flex: 1 })
      }
    >
      <AddNewPost navigation={navigation} />
    </SafeAreaView>
  )
}

export default NewPostScreen
