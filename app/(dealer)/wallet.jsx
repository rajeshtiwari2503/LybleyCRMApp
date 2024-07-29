import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import WalletPage from '../../components/Wallet';
 

export default function Wallet() {
  return (
    <View style={styles.container}>
     <WalletPage />
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