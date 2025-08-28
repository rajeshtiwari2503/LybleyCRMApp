import React, { useCallback, useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, ScrollView, ActivityIndicator, Alert, RefreshControl } from 'react-native';
import { Colors } from '@/constants/Colors';
import { useRouter } from 'expo-router';
import http_request from "../http_request"; // Assuming this is your HTTP request module
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ServiceDetails from './ServiceDetails';
import { MaterialIcons } from '@expo/vector-icons';
import UpdateServiceStatus from './UpdateServiceStatus';
import ServiceRequestForm from './CreateServiceRequest';
import PartOrder from './PartOrder';
import AddFeedback from './AddFeedback';
import Toast from 'react-native-toast-message';
import Map from "./Map"
import { Card } from "react-native-paper";
import * as Location from 'expo-location';
import Geolocation from 'react-native-geolocation-service';

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

export default function ViewComplaints() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [isMap, setIsMap] = useState(false);
    const [lantLong, setLatLong] = useState({});
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [refresh, setRefresh] = useState('');
    const [selectedService, setSelectedService] = useState('');
    const [selectedOrder, setSelectedOrder] = useState('');
    const [userData, setUserData] = useState(null);
    const [sampleComplaints, setComplaint] = useState([]);
    const [isModalVisible, setModalVisible] = useState(false);
    const [updateModalVisible, setUpdateModalVisible] = useState(false);
    const [orderModalVisible, setOrderModalVisible] = useState(false);
    const [createModalVisible, setCreateModalVisible] = useState(false);
    const [feedbackModalVisible, setFeedbackModalVisible] = useState(false);
    const [locationCurrent, setLocationCurrent] = useState(null);
    const [errorMsg, setErrorMsg] = useState(null);
    const [refreshing, setRefreshing] = useState(false);

    const [page, setPage] = useState(1);


    // useEffect(() => {
    //     const interval = setInterval(async () => {
    //         try {
    //             // Request foreground permissions
    //             let { status } = await Location.requestForegroundPermissionsAsync();
    //             if (status !== 'granted') {
    //                 setErrorMsg('Permission to access location was denied');
    //                 return;
    //             }

    //             // Force the location update by passing options
    //             // let locationCurr = await Location.getCurrentPositionAsync({
    //             //     accuracy: Location.Accuracy.High, // Adjust accuracy as needed
    //             //     maximumAge: 0,                    // Ensure no cached result
    //             //     timeInterval: 2000                // Optional: Set a time interval for getting location
    //             // });

    //             // console.log(locationCurr);

    //             // Update the state with the new location
    //             // setLocationCurrent(locationCurr);
    //         } catch (error) {
    //             console.error("Error fetching location:", error);
    //         }
    //     }, 20000);

     

    //     // Clean up the interval on component unmount
    //     return () => clearInterval(interval);

    // }, [ ]);

     useEffect(() => {
        const interval = setInterval(async () => {
            try {
                // Request foreground permissions
                let { status } = await Location.requestForegroundPermissionsAsync();
                if (status !== 'granted') {
                    setErrorMsg('Permission to access location was denied');
                    return;
                }

               
            } catch (error) {
                console.error("Error fetching location:", error);
            }
        }, 500000);
 console.log("dhghhhhhhhhhh");
 
        return () => clearInterval(interval);

    }, [ ]);

 useEffect(() => {
         

        getAllComplaint();

       

    }, [refreshing, refresh]);

    // console.log("sampleComplaints",sampleComplaints);
    
    const getLiveLocation = async () => {
        const locPermissionDenied = await locationPermission()
        if (locPermissionDenied) {
            const res = await Geolocation.requestAuthorization("whenInUse")
            console.log(res);

            setLocationCurrent({ lat: latitude, long: longitude });
        }
        const res = await Geolocation.requestAuthorization("whenInUse")
        console.log(res);
    }
    let text = 'Waiting..';
    if (errorMsg) {
        text = errorMsg;
    } else if (locationCurrent) {
        text = `Latitude: ${locationCurrent.coords.latitude}, Longitude: ${locationCurrent.coords.longitude}`;
    }

    const getAllComplaint = async () => {
        setLoading(true);
        try {
            const storedValue = await AsyncStorage.getItem("user");
            const user = JSON.parse(storedValue);
            setUserData(user?.user)
            let role = user.user.role;
            let id = user.user._id;
            // console.log("id",id);

            let response;

            if (role === "SERVICE") {

                response = await http_request.get(`/getComplaintByCenterId/${id}`);
            } else if (role === "TECHNICIAN") {

                response = await http_request.get(`/getComplaintByTechId/${id}`);
            } else if (role === "DEALER") {

                response = await http_request.get(`/getComplaintBydealerId/${id}`);
            } else if (role === "USER") {


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
    // const filteredComplaints = filterComplaints(selectedCategory);



    const handleCategoryPress = (category) => {
        setSelectedCategory(category);
    };

    const handleDetails = (item) => {
        setSelectedService(item);
        setModalVisible(true);
    }
    const handleOrder = (item) => {
        setSelectedOrder(item);
        setOrderModalVisible(true);
    }
    const handleUpdate = (item) => {
        setSelectedService(item);
        setUpdateModalVisible(true);
    }
    const handleCreateService = () => {
        setCreateModalVisible(true);
    }
    const handleFeedback = (item) => {
        setSelectedService(item);
        setFeedbackModalVisible(true);
    }
    const RefreshData = (data) => {
        setRefresh(Date.now());
    }

    // console.log(userData);



    const userPayment = async (item) => {
        try {
            const amount = item?.payment;
            const storedValue = await AsyncStorage.getItem('user');
            const userData = JSON.parse(storedValue);
            let response = await http_request.post("/payment", { amount: +amount });
            let { data } = response;
            const options = {
                key: "rzp_live_XyovAK0BmNvrWI", // Enter the Key ID generated from the Dashboard
                amount: +amount, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
                currency: "INR",
                name: "Lybley", //your business name
                description: "Payment for order",
                image: "/Logo.png",
                order_id: data.id, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
                handler: async function (orderDetails) {
                    try {

                        let response = await axios.post("https://lybleycrmserver-production.up.railway.app/paymentVerificationForUser", { response: orderDetails, item, amount });
                        let { data } = response;
                        if (data?.status === true) {
                            ToastMessage(data)
                            props?.RefreshData(data)
                        }

                    } catch (err) {
                        console.log(err);
                    }
                },
                prefill: {
                    name: userData?.user?.name, //your customer's name
                    email: userData?.user?.email,
                    contact: userData?.user?.contact
                },
                notes: {
                    "address": "Razorpay Corporate Office"
                },
                theme: {
                    color: "#3399cc"
                }
            };
            const rzp1 = new window.Razorpay(options);
            rzp1.open();
        } catch (err) {
            console.log(err);
        }
    }

    const onRefresh = useCallback(() => {
        setRefreshing(true);
        if (typeof RefreshData === 'function') {
            getAllComplaint();


        } else {
            console.error("RefreshData is not a function");
            console.log("dhjhj");

        }
        setTimeout(() => {
            setRefreshing(false);
        }, 2000);
    }, [RefreshData]);



    const filterComplaints = (category) => {
        return category === 'All' ? sampleComplaints : sampleComplaints.filter(complaint => complaint.status === category);
    };
    const itemsPerPage = 5;
    const totalPages = Math.ceil((filterComplaints(selectedCategory)?.length || 0) / itemsPerPage);
    const paginatedData = filterComplaints(selectedCategory)
        ?.sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt))
        ?.map((item, index) => ({ ...item, i: index + 1 }))
        ?.slice((page - 1) * itemsPerPage, page * itemsPerPage);
    const handleNextPage = () => {
        if (page < totalPages) setPage(prev => prev + 1);
    };

    const handlePrevPage = () => {
        if (page > 1) setPage(prev => prev - 1);
    };



    // const renderItem = ({ item, index }) => (
    //     <View key={index} style={styles.row}>
    //         <Text style={{ width: 50 }}>{item.i}</Text>
    //         <Text style={[{ paddingLeft: 13, width: 120 }]}>{item.productName}</Text>
    //         <Text style={[styles.statusCell, getStatusStyle(item?.status)]}>{item?.status === "ASSIGN" ? "ASSIGNED" : item?.status}</Text>
    //         <Text style={styles.cell}>{new Date(item.updatedAt).toLocaleString()}</Text>
    //         <View style={styles.actions}>


    //             <>
    //                 {item?.status !== "COMPLETED" && item?.status !== "CANCELED"&& item?.status !== "FINAL VERIFICATION" && (
    //                     <View style={styles.actions}>
    //                         <TouchableOpacity onPress={() => handleUpdate(item)}>
    //                             <MaterialIcons name="system-update-alt" size={24} color="green" />
    //                         </TouchableOpacity>
    //                     </View>
    //                 )}
    //                 {/* <TouchableOpacity style={{ marginLeft: 20 }} onPress={() => handleOrder(item)}>
    //                         <MaterialIcons name="update" size={24} color="blue" />
    //                     </TouchableOpacity> */}
    //                 {/* <TouchableOpacity style={{ marginLeft: 20 }} onPress={() => handleMapData(item?.lat, item?.long)}>
    //                     <MaterialIcons name="my-location" size={24} color="green" />
    //                 </TouchableOpacity> */}

    //             </>


    //             {(userData?.role === 'USER' || userData?.role === 'DEALER') && ["COMPLETED"].includes(item?.status) ? (
    //                 // <View style={{display:"flex"}}>
    //                 <>
    //                     <TouchableOpacity
    //                         onPress={() => handleFeedback(item)}
    //                         style={styles.feedbackButton}
    //                     >
    //                         <Text style={styles.feedbackButtonText}>Give Feedback</Text>
    //                     </TouchableOpacity>

    //                     {/* {item?.paymentStatus === "NotPay" && (
    //                         <TouchableOpacity
    //                             onPress={() => userPayment(item)}
    //                             style={styles.payButton}
    //                         >
    //                             <Text style={styles.payButtonText}>Pay</Text>
    //                         </TouchableOpacity>
    //                     )} */}
    //                     {/* <TouchableOpacity style={{ marginLeft: 20 }} onPress={() => handleMapData(item?.lat, item?.long)}>
    //                         <MaterialIcons name="my-location" size={24} color="green" />
    //                     </TouchableOpacity> */}
    //                 </>
    //                 // </View>
    //             ) : null
    //             }

    //             <TouchableOpacity style={{ marginLeft: 20 }} onPress={() => handleDetails(item)}>
    //                 <Ionicons name="eye" size={24} color="green" />
    //             </TouchableOpacity>

    //         </View>
    //     </View>
    // );
    // console.log("",userData);

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
                    {userData?.role !==  "USER" && userData?.role !==  "DEALER"  && item?.status !== "COMPLETED" && item?.status !== "CANCELED" && item?.status !== "FINAL VERIFICATION" && (
                        <TouchableOpacity onPress={() => handleUpdate(item)} style={styles.iconButton}>
                            <MaterialIcons name="system-update-alt" size={24} color="green" />
                        </TouchableOpacity>
                    )}

                    {(userData?.role === "USER" || userData?.role === "DEALER") && item?.status === "COMPLETED" && (
                        <TouchableOpacity onPress={() => handleFeedback(item)} style={styles.feedbackButton}>
                            <Text style={styles.feedbackButtonText}>Give Feedback</Text>
                        </TouchableOpacity>
                    )}

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


    // const handleMap=()=>{
    //     setIsMap(!isMap)
    // }
    const handleMapData = (lat, long) => {
        // console.log(lat, long);

        if (!lat || !long) {
            Alert.alert("Error", "Invalid location coordinates provided.");
        } else {
            setLatLong({ lat: lat, long: long })
            setIsMap(true)
        }

    }
    // console.log(locationCurrent?.coords?.latitude,locationCurrent?.coords?.longitude);
    const techLocation = { lat: locationCurrent?.coords?.latitude, long: locationCurrent?.coords?.longitude }

    //    console.log("userData",userData);

    return (
        <>
            {/* <Toast /> */}
            {/* {isMap === true && locationCurrent && lantLong  */}
            {isMap && techLocation?.lat && lantLong?.lat && lantLong?.long
                ? <Map lantLong={lantLong} techLocation={techLocation} handleMap={() => setIsMap(false)} />
                :
                <View style={styles.container}>
                    <Toast />

                    <View>
                        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                            <View style={styles.buttonContainer}>
                                {[
                                    { label: "All", value: "All" },
                                    { label: "Pending", value: "PENDING" },
                                    { label: "Assigned", value: "ASSIGN" },

                                    { label: "In Progress", value: "IN PROGRESS" },
                                    { label: "Part Pending", value: "PART PENDING" },
                                    { label: "Final Verification", value: "FINAL VERIFICATION" },
                                    { label: "Cancel", value: "CANCELED" },
                                    { label: "Complete", value: "COMPLETED" }
                                ].map((item) => (
                                    <TouchableOpacity
                                        key={item.value}
                                        style={[
                                            styles.categoryButton,
                                            selectedCategory === item.value && styles.selectedButton
                                        ]}
                                        onPress={() => handleCategoryPress(item.value)}
                                    >
                                        <Text
                                            style={[
                                                styles.buttonText,
                                                selectedCategory === item.value && styles.selectedText
                                            ]}
                                        >
                                            {item.label}
                                        </Text>
                                    </TouchableOpacity>
                                ))}
                            </View>
                        </ScrollView>
                    </View>


                    {(userData?.role === "USER" || userData?.role === "DEALER") && (
                        <TouchableOpacity style={styles.button} onPress={handleCreateService} activeOpacity={0.8}>
                            <Text style={styles.buttonText}>+ Create Service Request</Text>
                        </TouchableOpacity>
                    )}

                    {loading ?
                        <ActivityIndicator size="large" color="#0000ff" />
                        :
                        <>

                            <ScrollView refreshControl={
                                <RefreshControl
                                    refreshing={refreshing}
                                    onRefresh={onRefresh}
                                />
                            }    >
                                {paginatedData?.length === 0 ? (
                                    <View style={styles.noDataContainer}>
                                        <MaterialIcons name="info-outline" style={styles.noDataIcon} />
                                        <Text style={styles.noDataText}>No Data Available</Text>
                                    </View>
                                ) :(
                                    <View>

                                        <FlatList
                                            data={paginatedData}
                                            keyExtractor={(item, index) => index.toString()}
                                            renderItem={renderItem}
                                            contentContainerStyle={styles.listContainer}
                                            
                                        // refreshControl={
                                        //     <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                                        //   }
                                        showsVerticalScrollIndicator={false}
                                        />

                                    </View>
                                )
                                }
                            </ScrollView>


                            {/* Pagination Controls */}

                            <View style={styles.pagination}>
                                <TouchableOpacity onPress={handlePrevPage} disabled={page === 1} style={[styles.button, page === 1 && styles.disabledButton]}>
                                    <Text style={styles.buttonText}>Previous</Text>
                                </TouchableOpacity>
                                <Text style={styles.pageText}>
                                    Page {page} of {totalPages} ( total records  {filterComplaints(selectedCategory)?.length} )
                                </Text>
                                <TouchableOpacity onPress={handleNextPage} disabled={page >= totalPages} style={[styles.button, page >= totalPages && styles.disabledButton]}>
                                    <Text style={styles.buttonText}>Next</Text>
                                </TouchableOpacity>
                            </View>
                        </>

                    }
                    <ServiceDetails
                        isVisible={isModalVisible}
                        onClose={() => setModalVisible(false)}
                        complaint={selectedService}
                    />
                    <UpdateServiceStatus
                        isVisible={updateModalVisible}
                        onClose={() => setUpdateModalVisible(false)}
                        service={selectedService}
                        userData={userData}
                        RefreshData={RefreshData}
                    />
                    <PartOrder
                        isVisible={orderModalVisible}
                        onClose={() => setOrderModalVisible(false)}
                        service={selectedOrder}
                        RefreshData={RefreshData}
                    />
                    <ServiceRequestForm
                        isVisible={createModalVisible}
                        onClose={() => setCreateModalVisible(false)}
                        // user={user}
                        // onSave={handleSave}
                        RefreshData={RefreshData}
                    />
                    <AddFeedback
                        isVisible={feedbackModalVisible}
                        onClose={() => setFeedbackModalVisible(false)}
                        complaints={selectedService}
                        // user={user}
                        // onSave={handleSave}
                        RefreshData={RefreshData}
                    />
                </View>
            }
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.WHITE,
        paddingLeft: 20,
        paddingRight: 20,
        paddingTop: 10,
        marginTop: 5,
        marginBottom: 5,
        borderRadius: 30
    },
    tabCont: {
        flex: 1,
        backgroundColor: Colors.WHITE,
        // paddingLeft: 20,
        // paddingRight: 20,
        paddingTop: 10,
        width: "100%",
        marginTop: 5,
        marginBottom: 5,
        borderRadius: 30
    },
    buttonContainer: {
        flexDirection: "row",
        paddingVertical: 10,
        paddingHorizontal: 5,
    },
    categoryButton: {
        paddingVertical: 10,
        paddingHorizontal: 15,
        backgroundColor: "#cccccc",
        borderRadius: 5,
        marginHorizontal: 5,
    },
    selectedButton: {
        backgroundColor: "#09090b",  // Highlight color for selection
    },
    buttonText: {
        fontSize: 14,
        color: "#09090b",
        fontWeight: "500",
    },
    selectedText: {
        color: "#fff",
        fontWeight: "bold",
    },
    listContainer: {
        paddingBottom: 20,
    },
    noFeedback: {
        fontSize: 18,
        fontWeight: 'bold',
        marginTop: "90%",
        color: "red",
        marginBottom: 10,
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
    scrollContainer: {
        flexDirection: 'column',
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
        color: "white",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 20,
        fontWeight: 'bold',
        width: 120,
        marginRight: 10,
        paddingVertical: 3,
    },
    actions: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        // flex: 1,
        // width: 100,
    },
    inProgress: {
        backgroundColor: "#17A2B8", // Change Colors.PENDING to your desired color for IN PROGRESS
    },
    partPending: {
        backgroundColor: "#17A2B8", // Change Colors.SECONDARY to your desired color for PART PENDING
    },
    pending: {
        backgroundColor: "#17A2B8", // Change Colors.SECONDARY to your desired color for PART PENDING
    },
    assign: {
        backgroundColor: "#A9A9A9", // Change Colors.COMPLETED to your desired color for ASSIGN
    },
    completed: {
        backgroundColor: "#28A745", // Change Colors.SUCCESS to your desired color for COMPLETED
    },
    canceled: {
        backgroundColor: "#DC3545", // Change Colors.ERROR to your desired color for CANCELED
    },
    defaultStatus: {
        backgroundColor: "#28A745", // Default background color
    },
    button: {
        marginLeft: 20,
        backgroundColor: Colors.PRIMARY, // Blue background color
        paddingVertical: 12, // Vertical padding
        paddingHorizontal: 20, // Horizontal padding
        borderRadius: 5, // Rounded corners
        alignItems: 'center', // Center text horizontally
        elevation: 3, // Shadow for Android
        shadowColor: '#000', // Shadow color for iOS
        shadowOffset: { width: 0, height: 2 }, // Shadow offset for iOS
        shadowOpacity: 0.2, // Shadow opacity for iOS
        shadowRadius: 3,
        margin: 20 // Shadow radius for iOS
    },
    buttonText: {
        color: '#FFF', // White text color
        fontSize: 16, // Font size
        fontWeight: 'bold', // Bold text
    },
    feedbackButton: {
        borderRadius: 8,
        padding: 10,
        backgroundColor: '#2e7d32',
        alignItems: 'center',
    },
    feedbackButtonText: {
        color: 'black',
        fontWeight: 'bold',
    },
    payButton: {
        borderRadius: 8,
        marginLeft: 5,
        padding: 10,
        backgroundColor: '#007BFF',
        alignItems: 'center',
        marginTop: 10,
    },
    payButtonText: {
        color: 'black',
        fontWeight: 'bold',
    },
    pagination: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: "center",
        marginTop: 10,
        marginBottom: 10,
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

    noDataContainer: {
        flex: 1,
        justifyContent: "center",  // Centers content vertically
        alignItems: "center",      // Centers content horizontally
        padding: 20,
        // marginLeft: 65
    },

    noDataText: {
        fontSize: 18,
        color: "#888",
        fontWeight: "500",
        textAlign: "center",
        marginTop: 10,
    },

    noDataIcon: {
        fontSize: 50,
        color: "#bbb",
    },

});
