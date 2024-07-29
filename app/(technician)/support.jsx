import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import Supports from '../../components/Supports';

export default function Support() {
  return (
    <View style={styles.container}>
       <Supports />
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