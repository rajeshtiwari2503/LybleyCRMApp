import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, ActivityIndicator, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import http_request from '../http_request'; // Replace with your HTTP request handler
import Toast from 'react-native-toast-message';

const FeedbackPage = ({data}) => {
  
  const [isLoading, setIsLoading] = useState(false);

  

  const renderFeedbackItem = ({ item }) => (
    <View style={styles.itemContainer}>
      <Text style={styles.itemText}>Ticket Number: {item.ticketNumber}</Text>
      <Text style={styles.itemText}>Service Date: {new Date(item.serviceDate).toLocaleDateString()}</Text>
      <Text style={styles.itemText}>Customer: {item.customerName}</Text>
      <Text style={styles.itemText}>Feedback: {item.feedback}</Text>
      <Text style={styles.itemText}>Rating: {item.rating}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Toast ref={(ref) => Toast.setRef(ref)} />
      <Text style={styles.header}>Feedback List</Text>
      {isLoading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <FlatList
          data={data}
          keyExtractor={(item) => item?._id} // Replace with your unique ID field
          renderItem={renderFeedbackItem}
          contentContainerStyle={styles.listContainer}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  listContainer: {
    paddingBottom: 20,
  },
  itemContainer: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    marginBottom: 10,
  },
  itemText: {
    fontSize: 16,
    marginBottom: 5,
  },
});

export default FeedbackPage;
