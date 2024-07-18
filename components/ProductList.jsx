import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, Modal,   ActivityIndicator, Button, Alert, ScrollView, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import http_request from '../http_request';
import Toast from 'react-native-toast-message';
import AddProduct from './AddProduct';

const ProductList = (props) => {
  const navigation = useNavigation();

  const categories = props?.categories;
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [isWarranty, setIsWarranty] = useState(false);
  const [warranty, setWarranty] = useState("");
  const [confirmBoxView, setConfirmBoxView] = useState(false);
  const [cateId, setCateId] = useState("");
  const [editData, setEditData] = useState(null);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [sortDirection, setSortDirection] = useState('asc');
  const [sortBy, setSortBy] = useState('id');

  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      const storedValue = await AsyncStorage.getItem("user");
      if (storedValue) {
        setUserData(JSON.parse(storedValue));
      }
    };

    fetchUserData();
  }, []);

  const filterData = props?.data?.filter((item) => item?.userId === userData?.user?._id);
  const data = userData?.user?.role === "ADMIN" || userData?.user?.role === "BRAND" ? props?.data : filterData;

  const handleSort = (property) => {
    const isAsc = sortBy === property && sortDirection === 'asc';
    setSortDirection(isAsc ? 'desc' : 'asc');
    setSortBy(property);
  };

  const sortedData = stableSort(data, getComparator(sortDirection, sortBy))?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  const handleEditModalClose = () => {
    setEditModalOpen(false);
  };

  const handleWarrantyClose = () => {
    setIsWarranty(false);
  };

  const handleAdd = (row) => {
    setEditData(row);
    setEditModalOpen(true);
  };

  const handleDelete = (id) => {
    setCateId(id);
    setConfirmBoxView(true);
  };

  const deleteData = async () => {
    try {
      let response = await http_request.delete(`/deleteProduct/${cateId}`);
      let { data } = response;
      setConfirmBoxView(false);
      props?.RefreshData(data);
      Toast.show({ text1: data.message });
    } catch (err) {
      console.log(err);
    }
  };

  const handleWarranty = (data) => {
    setWarranty(data);
    setIsWarranty(true);
  };

  return (
    <View style={{ flex: 1, padding: 20 }}>
      <Toast ref={(ref) => Toast.setRef(ref)} />
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
        <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Product Information</Text>
        <TouchableOpacity onPress={() => handleAdd(null)} style={{ backgroundColor: '#0284c7', padding: 10, borderRadius: 5 }}>
          <Text style={{ color: 'white' }}>Add Product</Text>
        </TouchableOpacity>
      </View>
      {!data.length ? (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      ) : (
        <FlatList
          data={sortedData}
          keyExtractor={(item) => item._id}
          renderItem={({ item }) => (
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 10, borderBottomWidth: 1, borderBottomColor: '#ccc' }}>
              <Text>{item.productName}</Text>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <TouchableOpacity onPress={() => navigation.navigate('ServiceRequest', { id: item._id })} style={{ marginRight: 10 }}>
                  <Text style={{ color: 'blue' }}>Request Service</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => handleWarranty(item.warrantyStatus)} style={{ marginRight: 10 }}>
                  <Text style={{ color: 'blue' }}>View Warranty</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => handleAdd(item)} style={{ marginRight: 10 }}>
                  <Text style={{ color: 'green' }}>Edit</Text>
                </TouchableOpacity>
                {userData?.user?.role === "ADMIN" && (
                  <TouchableOpacity onPress={() => handleDelete(item._id)}>
                    <Text style={{ color: 'red' }}>Delete</Text>
                  </TouchableOpacity>
                )}
              </View>
            </View>
          )}
        />
      )}

      <Modal visible={editModalOpen} onRequestClose={handleEditModalClose}>
       
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.scrollContainer}>
      <View style={{ flex: 1, padding: 20 }}>

          <TouchableOpacity onPress={handleEditModalClose} style={{ alignSelf: 'flex-end' }}>
            <Text style={{ color: 'red' }}>Close</Text>
          </TouchableOpacity>

          <AddProduct categories={categories} userData={userData} brands={props?.brands} existingProduct={editData} RefreshData={props?.RefreshData} onClose={handleEditModalClose} />
         
        </View>
        </ScrollView>
      </Modal>

      {confirmBoxView && (
        Alert.alert(
          "Confirm Delete",
          "Are you sure you want to delete this product?",
          [
            { text: "Cancel", onPress: () => setConfirmBoxView(false), style: "cancel" },
            { text: "OK", onPress: deleteData }
          ]
        )
      )}

      <Modal visible={isWarranty} onRequestClose={handleWarrantyClose}>
        <View style={{ flex: 1, padding: 20, backgroundColor: warranty ? 'green' : 'red' }}>
          <TouchableOpacity onPress={handleWarrantyClose} style={{ alignSelf: 'flex-end' }}>
            <Text style={{ color: 'white' }}>Close</Text>
          </TouchableOpacity>
          <Text style={{ color: 'white', fontSize: 18 }}>{warranty ? "Your product is under Warranty" : "Your product is not under Warranty"}</Text>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
    scrollContainer: {
        flexDirection: 'col',
        marginHorizontal: 10,
        marginBottom: 10,
    },
});


export default ProductList;

function stableSort(array, comparator) {
  const stabilizedThis = array?.map((el, index) => [el, index]);
  stabilizedThis?.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis?.map((el) => el[0]);
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}
