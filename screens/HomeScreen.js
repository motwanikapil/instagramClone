import React from 'react'
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  StatusBar,
} from 'react-native'
import Header from '../components/Home/Header'
import Post from '../components/Home/Post'
import Stories from '../components/Home/Stories'
import SafeViewAndroid from '../components/SafeViewAndroid'
import { POSTS } from '../data/posts'
import { bottomTabIcons } from '../components/Home/BottomTabs'
import BottomTabs from '../components/Home/BottomTabs'
const HomeScreen = ({ navigation }) => {
  return (
    <SafeAreaView
      style={
        (SafeViewAndroid.AndroidSafeArea, { backgroundColor: 'black', flex: 1 })
      }
    >
      <Header navigation={navigation} />
      <Stories />
      <ScrollView>
        {POSTS.map((post, index) => (
          <Post post={post} key={index} />
        ))}
      </ScrollView>
      <BottomTabs icons={bottomTabIcons} />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'black',
    flex: 1,
  },
})

export default HomeScreen
