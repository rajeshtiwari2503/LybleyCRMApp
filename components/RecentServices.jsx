import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, ActivityIndicator, ScrollView, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { Colors } from '@/constants/Colors';
import ServiceDetails from './ServiceDetails';
import AsyncStorage from '@react-native-async-storage/async-storage';
import http_request from "../http_request";

const RecentServicesList = (props) => {
  const router = useRouter();
  const [selectedService, setSelectedService] = useState('');
  const [isModalVisible, setModalVisible] = useState(false);
  const userData = props?.userData;
  const [sampleComplaints, setComplaint] = useState([]);
  const [page, setPage] = useState(1);
   
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getAllComplaint();
  }, [page]);

  // const getAllComplaint = async () => {
  //   setLoading(true);
  //   try {
  //     const storedValue = await AsyncStorage.getItem('user');
  //     const user = JSON.parse(storedValue);
  //     let role = user.user.role;
  //     let id = user.user._id;

  //     let queryParams = new URLSearchParams();
  //     queryParams.append("page", page);
  //     queryParams.append("limit", limit);

  //     if (role === "BRAND") queryParams.append("brandId", id);
  //     else if (role === "SERVICE") queryParams.append("serviceCenterId", id);
  //     else if (role === "TECHNICIAN") queryParams.append("technicianId", id);
  //     else if (role === "CUSTOMER") queryParams.append("userId", id);
  //     else if (role === "DEALER") queryParams.append("dealerId", id);

  //     let response =
  //       role === "ADMIN" || role === "EMPLOYEE"
  //         ? await http_request.get(`/getAllComplaint?page=${page}&limit=${limit}`)
  //         : await http_request.get(`/getAllComplaintByRole?${queryParams.toString()}`);

  //     let { data } = response;

  //     setComplaint(data?.data);
  //     setTotalPages(Math.ceil(data?.totalComplaints / limit));
  //   } catch (err) {
  //     console.error("Error fetching complaints:", err);
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  const getAllComplaint = async () => {
    setLoading(true);
    try {
      const storedValue = await AsyncStorage.getItem("user");
      const user = JSON.parse(storedValue);
      let role = user.user.role;
      let id = user.user._id;
      // console.log("id",id);

      let response;
      let queryParams = new URLSearchParams();
      if (role === "SERVICE") {
        // queryParams.append("userId", id);
        response = await http_request.get(`/getComplaintByCenterId/${id}`);
      } else if (role === "TECHNICIAN") {
        // queryParams.append("userId", id);
        response = await http_request.get(`/getComplaintByTechId/${id}`);
      } else if (role === "DEALER") {
        // queryParams.append("userId", id);
        response = await http_request.get(`/getComplaintBydealerId/${id}`);
      } else if (role === "USER") {

        // queryParams.append("userId", id);
        response = await http_request.get(`/getComplaintByUserId/${id}`);
      }
      const { data } = response
      // console.log("data",data?.length);

      setComplaint(data);

    } catch (err) {
      console.error("Error fetching complaints:", err);
    } finally {
      setLoading(false);
    }
  };


  const handleDetails = (item) => {
    setSelectedService(item);
    setModalVisible(true);
  };

 
  const itemsPerPage = 5; // Adjust as needed

  const totalPages = Math.ceil((sampleComplaints?.length || 0) / itemsPerPage);

  // Sort and Paginate Data
  const paginatedData = sampleComplaints
    ?.sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt))
    ?.map((item, index) => ({ ...item, i: index + 1 }))
    ?.slice((page - 1) * itemsPerPage, page * itemsPerPage);

  // Handlers
  const handleNextPage = () => {
    if (page < totalPages) setPage(prev => prev + 1);
  };

  const handlePrevPage = () => {
    if (page > 1) setPage(prev => prev - 1);
  };
  
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Recent Service Information</Text>
      {loading ? (
        <View style={styles.loader}>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      ) : (
        <>
          <ScrollView horizontal contentContainerStyle={styles.scrollContainer}>
            <View>
              <View style={styles.header}>
                <Text style={[styles.headerCell, { width: 60 }]}>Sr. No.</Text>
                <Text style={[styles.headerCell, { width: 120 }]}>Product</Text>
                <Text style={[styles.headerCell, { textAlign: "center", paddingRight: 20 }]}>Status</Text>
                <Text style={styles.headerCell}>Updated At</Text>
                <Text style={[styles.headerCell, { textAlign: 'right' }]}>Actions</Text>
              </View>
              <FlatList
                data={paginatedData}
                keyExtractor={item => item?._id}
                renderItem={({ item, index }) => (
                  <View key={index} style={styles.row}>
                    <Text style={{ width: 50 }}>{item.i}</Text>
                    <Text style={[{ paddingLeft: 13, width: 120 }]}>{item.productName}</Text>
                    <Text style={styles.statusCell}>{item?.status === "ASSIGN" ? "ASSIGNED" : item?.status}</Text>
                    <Text style={styles.cell}>{new Date(item.updatedAt).toLocaleString()}</Text>
                    <View style={styles.actions}>
                      <TouchableOpacity onPress={() => handleDetails(item)}>
                        <Ionicons name="eye" size={24} color="green" />
                      </TouchableOpacity>
                    </View>
                  </View>
                )}
              />
            </View>
          </ScrollView>

          {/* Pagination Controls */}
          <View style={styles.pagination}>
            <TouchableOpacity onPress={handlePrevPage} disabled={page === 1} style={[styles.button, page === 1 && styles.disabledButton]}>
              <Text style={styles.buttonText}>Previous</Text>
            </TouchableOpacity>
            <Text style={styles.pageText}>
              Page {page} of {totalPages} ( total records  {sampleComplaints?.length} )
            </Text>
            <TouchableOpacity onPress={handleNextPage} disabled={page >= totalPages} style={[styles.button, page >= totalPages && styles.disabledButton]}>
              <Text style={styles.buttonText}>Next</Text>
            </TouchableOpacity>
          </View>
        </>
      )}
      <ServiceDetails
        isVisible={isModalVisible}
        onClose={() => setModalVisible(false)}
        complaint={selectedService}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    flexDirection: 'row',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    backgroundColor: '#f8f8f8',
  },
  headerCell: {
    flex: 1,
    fontWeight: 'bold',
    textAlign: 'left',
    width: 110,
  },
  row: {
    flexDirection: 'row',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderBottomWidth: 1,
    alignItems: "center",
    borderBottomColor: '#ddd',
  },
  cell: {
    flex: 1,
    textAlign: 'left',
    width: 120,
  },
  statusCell: {
    flex: 1,
    textAlign: 'center',
    backgroundColor: Colors.PRIMARY,
    color: "white",
    paddingTop: 7,
    paddingBottom: 7,
    marginRight: 10,
    borderRadius: 10,
    width: 120,
  },
  actions: {
    flexDirection: 'row',
    width: 100,
    alignItems: 'center',
    justifyContent: "flex-end",
  },
  scrollContainer: {
    flexDirection: 'column',
  },
  pagination: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems:"center",
    marginTop: 10,
  },
  button: {
    backgroundColor: '#007bff',
    padding: 10,
    borderRadius: 5,
  },
  disabledButton: {
    backgroundColor: '#cccccc',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  pageText: {
    fontSize: 12,
    fontWeight: 'bold',
  },
});

export default RecentServicesList;
