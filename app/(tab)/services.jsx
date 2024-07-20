import { View,  StyleSheet } from 'react-native'
import React from 'react'
import ViewComplaints from '../../components/Services';
 
 

export default function Service() {
  return (
    <View style={styles.container}>
      <ViewComplaints  />
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