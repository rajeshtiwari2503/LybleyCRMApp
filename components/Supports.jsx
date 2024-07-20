import { View, Text, StyleSheet } from 'react-native'
import React from 'react'

export default function Supports() {
  return (
    <View style={styles.container}>
      <Text>Supports</Text>
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
        backgroundColor: '#fff',
        marginTop:25,
        borderRadius:30
    },
})