 
import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Modal, Button, Alert, TextInput, ActivityIndicator } from 'react-native';
import { IconButton } from 'react-native-paper';
import { Add, Edit, Delete } from 'react-native-vector-icons/MaterialIcons'; // Adjust icons accordingly
import AsyncStorage from '@react-native-async-storage/async-storage';

const StockList = ({ data  }) => {
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [editData, setEditData] = useState(null);
  const [confirmBoxView, setConfirmBoxView] = useState(false);
  const [userData, setUserData] = useState(null);
  
  
  useEffect(() => {
    const fetchUserData = async () => {
        const storedValue = await AsyncStorage.getItem("user");
        if (storedValue) {
          setUserData(JSON.parse(storedValue));
        }
      };
      fetchUserData()
  }, []);

   

  
  if (data?.length>0) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  const filteredData = userData?.user?.role === 'ADMIN' || 'BRAND' ? data : data?.filter(item => item?.userId === userData?.user?._id);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Stock Information</Text>
        <TouchableOpacity style={styles.addButton} onPress={handleAdd}>
          <Add size={24} color="white" />
          <Text style={styles.buttonText}>Add Stock</Text>
        </TouchableOpacity>
      </View>

      {filteredData.length === 0 ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <FlatList
          data={filteredData}
          keyExtractor={(item) => item._id}
          renderItem={({ item }) => (
            <View style={styles.row}>
              <Text style={styles.cell}>{item._id}</Text>
              <Text style={styles.cell}>{item.sparepartName}</Text>
              <Text style={styles.cell}>{item.freshStock}</Text>
              <Text style={styles.cell}>{item.brandName}</Text>
              <Text style={styles.cell}>{new Date(item.createdAt).toLocaleString()}</Text>
              <View style={styles.actions}>
                <IconButton icon="pencil" color="green" size={20} onPress={() => handleEdit(item)} />
                <IconButton icon="delete" color="red" size={20} onPress={() => handleDelete(item._id)} />
              </View>
            </View>
          )}
        />
      )}

      <Modal visible={editModalOpen} onRequestClose={handleEditModalClose}>
        <View style={styles.modalContainer}>
          <Text style={styles.modalTitle}>{editData ? 'Edit Stock' : 'Add Stock'}</Text>
          {/* Your AddStock component should be adapted to React Native */}
          {/* <AddStock userData={userData} products={products} data={data} existingStock={editData} RefreshData={RefreshData} onClose={handleEditModalClose} /> */}
          <Button title="Close" onPress={handleEditModalClose} />
        </View>
      </Modal>

      <Modal visible={confirmBoxView} transparent={true}>
        <View style={styles.confirmBox}>
          <Text>Are you sure you want to delete this stock?</Text>
          <Button title="Yes" onPress={deleteData} />
          <Button title="No" onPress={() => setConfirmBoxView(false)} />
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  addButton: {
    flexDirection: 'row',
    backgroundColor: '#0284c7',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    marginLeft: 8,
  },
  row: {
    flexDirection: 'row',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    alignItems: 'center',
  },
  cell: {
    flex: 1,
    textAlign: 'center',
  },
  actions: {
    flexDirection: 'row',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  confirmBox: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
});

export default StockList;
