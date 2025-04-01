import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, ActivityIndicator, ScrollView, StyleSheet } from 'react-native';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { Colors } from '@/constants/Colors';
import ServiceDetails from './ServiceDetails';
import AsyncStorage from '@react-native-async-storage/async-storage';
import http_request from "../http_request";
import { Card } from "react-native-paper";





const getStatusStyle = (status) => {
  switch (status) {
      case 'IN PROGRESS':
          return styles.inProgress;
      case 'PART PENDING':
          return styles.partPending;
      case 'PENDING':
          return styles.pending;
      case 'ASSIGN':
          return styles.assign;
      case 'COMPLETED':
          return styles.completed;
      case 'CANCELED':
          return styles.canceled;
      default:
          return styles.defaultStatus;
  }
};
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
  

   const renderItem = ({ item, index }) => (
          <Card key={index} style={userData?.role === "USER" ? styles.cardUser : styles.card}>
              <Card.Content>
                  {/* Complaint ID & Name */}
                  <View style={styles.header}>
                      <Text style={styles.complaintId}>#{item.i} {item?.complaintId}</Text>
                      <Text style={styles.userName}>{item.fullName}</Text>
                  </View>
  
                  {/* Details Section */}
                  <View style={styles.detailsContainer}>
                      <DetailRow label="Product Name" value={item.productName} />
                      <DetailRow label="Brand" value={item.productBrand} />
                      <DetailRow label="Category" value={item.categoryName} />
                      <DetailRow label="Contact No." value={item.phoneNumber} /> 
                      <DetailRow
                          label="Address"
                          value={`${item.serviceAddress}, ${item.pincode}, ${item.district}, ${item.state}`}
                          isAddress
                      />
                        <DetailRow label="CreatedAt" value={new Date(item.updatedAt).toLocaleString()} />
                  </View>
  
                  {/* Status & Date */}
                  <View style={styles.infoContainer}>
                     
                      <Text style={[styles.statusCell, getStatusStyle(item?.status)]}>{item?.status === "ASSIGN" ? "ASSIGNED" : item?.status}
                      </Text>
                   
                       {/* Action Buttons */}
                  <View style={styles.actions}>
                      {/* {userData?.role !==  "USER" && userData?.role !==  "DEALER"  && item?.status !== "COMPLETED" && item?.status !== "CANCELED" && item?.status !== "FINAL VERIFICATION" && (
                          <TouchableOpacity onPress={() => handleUpdate(item)} style={styles.iconButton}>
                              <MaterialIcons name="system-update-alt" size={24} color="green" />
                          </TouchableOpacity>
                      )}
   */}
                      {/* {(userData?.role === "USER" || userData?.role === "DEALER") && item?.status === "COMPLETED" && (
                          <TouchableOpacity onPress={() => handleFeedback(item)} style={styles.feedbackButton}>
                              <Text style={styles.feedbackButtonText}>Give Feedback</Text>
                          </TouchableOpacity>
                      )} */}
  
                      <TouchableOpacity onPress={() => handleDetails(item)} style={styles.iconButton}>
                          <Ionicons name="eye" size={24} color="green" />
                      </TouchableOpacity>
                  </View>
                     
                  </View>
  
                 
              </Card.Content>
          </Card>
      );
       // A reusable component for displaying label-value pairs
          const DetailRow = ({ label, value, isAddress = false }) => (
              <View style={[styles.detailRow, isAddress && styles.addressRow]}>
                  <Text style={styles.label}>{label}:</Text>
                  <Text style={[styles.value, isAddress && styles.addressValue]}>{value}</Text>
              </View>
          );
      
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Recent Service Information</Text>
      {loading ? (
        <View style={styles.loader}>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      ) : (
        <>
          <ScrollView >
            <View>
              {/* <View style={styles.header}>
                <Text style={[styles.headerCell, { width: 60 }]}>Sr. No.</Text>
                <Text style={[styles.headerCell, { width: 120 }]}>Product</Text>
                <Text style={[styles.headerCell, { textAlign: "center", paddingRight: 20 }]}>Status</Text>
                <Text style={styles.headerCell}>Updated At</Text>
                <Text style={[styles.headerCell, { textAlign: 'right' }]}>Actions</Text>
              </View> */}
              
              <FlatList
                data={paginatedData}
                keyExtractor={item => item?._id}
                renderItem={renderItem}
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
  card: {
    marginVertical: 8,
    marginLeft: 2,
    borderRadius: 10,
    backgroundColor: "#e2dede",
    elevation: 3,
    // width:"89%"
},
cardUser: {
    marginVertical: 8,
    marginLeft: 2,
    borderRadius: 10,
    backgroundColor: "#e2dede",
    elevation: 3,
    // width:"57%"
},
header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
},
complaintId: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
},
userName: {
    fontSize: 14,
    fontWeight: "600",
    color: "#555",
},
detailsContainer: {
    marginVertical: 8,
   
},
detailRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 4,
},
addressRow: {
    alignItems: "flex-start",  // Aligns text to the top for address wrapping
    flexDirection: "column",   // Makes label and value stack vertically
},
label: {
    fontSize: 14,
    fontWeight: "600",
    color: "#666",
    flexShrink: 0,
},
value: {
    fontSize: 14,
    fontWeight: "400",
    color: "#333",
    textAlign: "right",
    flexShrink: 1,
},
addressValue: {
    textAlign: "left",
    flexWrap: "wrap",   // Allows wrapping
    width: "100%",      // Ensures it takes full width
},
infoContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 10,
},
statusText: {
    fontSize: 14,
    fontWeight: "600",
},
dateText: {
    fontSize: 12,
    color: "#777",
},
actions: {
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
    marginTop: 10,
},
iconButton: {
    padding: 8,
    marginHorizontal: 4,
},
feedbackButton: {
    backgroundColor: "#4CAF50",
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 6,
    marginLeft: 8,
},
feedbackButtonText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "bold",
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
