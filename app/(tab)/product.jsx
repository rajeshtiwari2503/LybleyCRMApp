import { View, Text,StyleSheet } from 'react-native'
import React from 'react'
// import Products from '../../components/Products';
import DealerReport from '../../components/Report';
 

export default function Product() {
  return (
    <View style={styles.container}>
      <DealerReport />
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