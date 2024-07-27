import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import React from 'react'
import UserProfile from '../../components/Profile';



export default function Profile() {

  return   (
    <View style={styles.container}>
     <UserProfile />
    </View>
  );
};

const styles = StyleSheet.create({
  
      container: {
        flex: 1,
        backgroundColor: '#000000',
        paddingBottom:10,
        paddingTop:10
        // padding: 10,
      },
  
 
});