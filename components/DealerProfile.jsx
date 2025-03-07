import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Image, ActivityIndicator, RefreshControl } from 'react-native'
import React, {  useCallback, useState } from 'react'
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Colors } from '@/constants/Colors'
import EditDealerProfile from './EditDealerProfile';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default function DealerProfile(props) {

  const [isModalVisible, setModalVisible] = useState(false);
 
  const {user,RefreshData,handleLogout}=props
  
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    if (typeof RefreshData === 'function') {
      RefreshData();
    } else {
      console.error("RefreshData is not a function");
    }
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, [RefreshData]);
  return (
   
    <ScrollView  refreshControl={
      <RefreshControl
        refreshing={refreshing}
        onRefresh={onRefresh}  
      />
    } style={styles.container} >
      <View style={styles.header}>
        {/* <TouchableOpacity onPress={() => navigation.goBack()}>
              <Icon name="arrow-back" size={24} color="#fff" />
            </TouchableOpacity> */}
        <Text style={styles.headerText}>Profile</Text>
      </View>
      <View style={styles.profileContainer}>
        <Image source={{ uri: user?.profilePicture }} style={styles.profileImage} />
        <Text style={styles.name}>{user?.name}</Text>
        <Text style={styles.email}>{user?.email}</Text>
        {/* <Text style={styles.location}>{user?.address}</Text> */}
        <TouchableOpacity style={styles.editButton} onPress={() => setModalVisible(true)}>
          <Text style={styles.editButtonText}>Edit Profile</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.infoContainer}>
      <View style={styles.infoBox}>
          <MaterialCommunityIcons name="registered-trademark" size={24} color="black" />
          <Text style={styles.infoText}>{user?.businessRegistrationNumber}</Text>
        </View>
        <View style={styles.infoBox}>
        <MaterialCommunityIcons name="file-document" size={24} color="#4CAF50" />
          <Text style={styles.infoText}>{user?.gstVatNumber}</Text>
        </View>
        <View style={styles.infoBox}>
          <Icon name="phone" size={24} color="#3F51B5" />
          <Text style={styles.infoText}>{user?.contact}</Text>
        </View>
        <View style={styles.infoBox}>
          <Icon name="verified-user" size={24} color="#FF9800" />
          <Text style={styles.infoText}>{user?.verification}</Text>
        </View>
        <View style={styles.infoBox}>
          <Icon name="verified" size={24} color="#3F51B5" />
          <Text style={styles.infoText}>{user?.acceptedTerms===true?"Term & Condition   Accepted":"Term & Condition not Accepted"}</Text>
        </View>
        <View style={styles.infoBox}>
          <Icon name="location-on" size={24} color="#4CAF50" />
          <Text style={styles.infoText}>{user?.businessAddress}</Text>
        </View>
      </View>
      <View style={styles.container}>
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Text style={styles.logoutButtonText}>Logout</Text>

        </TouchableOpacity>
      </View>
      <EditDealerProfile
        isVisible={isModalVisible}
        onClose={() => setModalVisible(false)}
        user={user}
        // onSave={handleSave}
        RefreshData={RefreshData}
      />
    </ScrollView>
    
  );
};

const styles = StyleSheet.create({
    // container: {
    //   flex: 1,
    //   backgroundColor: '#fff',
    // },
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#fff',
    marginTop: 5,
    marginBottom: 5,
    borderRadius: 30
  },
  logoutButton: {
    backgroundColor: '#ff4757',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoutButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  header: {
    backgroundColor: '#6200EE',
    height: 60,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    borderRadius: 15
  },
  headerText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 16,
  },
  profileContainer: {
    alignItems: 'center',
    marginVertical: 24,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 3,
    borderColor: '#6200EE',
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    marginVertical: 8,
  },
  email: {
    fontSize: 16,
    color: '#888',
  },
  location: {
    fontSize: 16,
    color: '#888',
    marginBottom: 16,
  },
  editButton: {
    backgroundColor: Colors.PRIMARY,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 15,
    marginTop:20
  },
  editButtonText: {
    color: '#fff',
    fontSize: 16,
  },
  infoContainer: {
    marginHorizontal: 16,
  },
  infoBox: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 8,
  },
  infoText: {
    fontSize: 16,
    marginLeft: 16,
  },
});





