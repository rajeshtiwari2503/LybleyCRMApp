import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import UserFeedbacks from '../../components/Feedback';

export default function Feedback() {
  return (
    <View style={styles.container}>
   <UserFeedbacks />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
    paddingBottom:10,
    paddingTop:10
    // padding: 10,
  },
});