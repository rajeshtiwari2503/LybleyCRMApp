import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
 

export default function Report() {
  return (
    <View style={styles.container}>
      <Text>ram report</Text>
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