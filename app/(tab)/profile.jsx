import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import React from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';


export default function Profile() {
const router=useRouter()

    const handleLogout = async () => {
        try {
          await AsyncStorage.removeItem('user');
          
          router.push("/auth/sign-in"); // Navigate to login page after logout
        } catch (error) {
          console.log('Error clearing user data', error);
        }
      };
  return   (
    <View style={styles.container}>
      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.logoutButtonText}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 50,
  },
  logoutButton: {
    backgroundColor: '#ff4757',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoutButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});