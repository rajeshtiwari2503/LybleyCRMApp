// import React, { useState } from 'react';
// import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';

// import { BarChart, PieChart } from 'react-native-chart-kit';
// import { useNavigation } from '@react-navigation/native';
// import { FontAwesome, MaterialIcons } from '@expo/vector-icons';
// import { Colors } from '@/constants/Colors'
// import RecentServicesList from './RecentServices';
// import { useRouter } from 'expo-router';
// import NotificationModal from './Notification';

// // import RecentServicesList from '../complaint/RecentServices';

// const UserDashboard = (props) => {
//     const router = useRouter();
//     const navigation=useNavigation()
//     const userData = props?.userData;
//     const dashData = props?.dashData;
//     const complaint = props?.complaints;
//     const notifications = props?.notifications;
//     const RefreshData = props?.RefreshData
//     const [modalVisible, setModalVisible] = useState(false);

//     const showNotification = () => {
//         setModalVisible(true);
//     };

//     const hideNotification = () => {
//         setModalVisible(false);
//     };
//     const unreadNoti = userData?.role === "ADMIN" ? notifications?.filter((item) => item?.adminStatus === "UNREAD")
//     : userData?.role === "BRAND" ? notifications?.filter((item) => item?.brandStatus === "UNREAD")
//       : userData?.role === "SERVICE" ? notifications?.filter((item) => item?.serviceCenterStatus === "UNREAD")
//         : userData?.role === "TECHNICIAN" ? notifications?.filter((item) => item?.technicianStatus === "UNREAD")
//           : userData?.role === "USER" ? notifications?.filter((item) => item?.userStatus === "UNREAD")
//             : userData?.role === "DEALER" ? notifications?.filter((item) => item?.userStatus === "UNREAD")
//               : ""

//     const notificationCount = unreadNoti?.length;



//     const filterData = userData?.role === "ADMIN" ? dashData
//         : userData?.role === "BRAND" ? complaint.filter((item) => item?.brandId === userData._id)
//             : userData?.role === "USER" ? complaint.filter((item) => item?.userId === userData._id)
//                 : userData?.role === "SERVICE" ? complaint.filter((item) => item?.assignServiceCenterId === userData._id)
//                     : userData?.role === "TECHNICIAN" ? complaint.filter((item) => item?.technicianId === userData._id)
//                         : userData?.role === "DEALER" ? complaint.filter((item) => item?.dealerId === userData._id)
//                             : [];

//     const data = filterData?.map((item, index) => ({ ...item, i: index + 1 }));

//     const pieChartData = [
//         { name: "AllComplaints", population: dashData?.complaints?.allComplaints || 0, color: "rgba(131, 167, 234, 1)", legendFontColor: "#7F7F7F", legendFontSize: 15 },
//         { name: "Assign", population: dashData?.complaints?.assign || 0, color: "#F00", legendFontColor: "#7F7F7F", legendFontSize: 15 },
//         { name: "Pending", population: dashData?.complaints?.pending || 0, color: "yellow", legendFontColor: "#7F7F7F", legendFontSize: 15 },
//         { name: "Complete", population: dashData?.complaints?.complete || 0, color: "green", legendFontColor: "#7F7F7F", legendFontSize: 15 },
//         { name: "PartPending", population: dashData?.complaints?.partPending || 0, color: "purple", legendFontColor: "#7F7F7F", legendFontSize: 15 },
//     ];

//     // Example bar chart data
//     const barChartData = [
//         { label: "AllComplaints", data: dashData?.complaints?.allComplaints || 0 },
//         { label: "Assign", data: dashData?.complaints?.assign || 0 },
//         { label: "Pending", data: dashData?.complaints?.pending || 0 },
//         { label: "Complete", data: dashData?.complaints?.complete || 0 },
//         { label: "PartPending", data: dashData?.complaints?.partPending || 0 },
//     ];

//     return (

//         <ScrollView>
//             <View style={styles.container}>
//                 {/* Replace with your React Native components and styling */}
//                 <View style={styles.headerContent}>
//                     <TouchableOpacity onPress={() => navigation.navigate('Profile')}  >
//                         <MaterialIcons name="person" size={24} color="black" style={styles.icon} />
//                     </TouchableOpacity>
//                     <Text style={styles.title}>Dashboard</Text>
//                     <View style={styles.iconContainer}>
//                         <TouchableOpacity onPress={showNotification}  >
//                             <FontAwesome name="bell" size={24} color="black" style={styles.icon} />
//                             {notificationCount > 0 && (
//                                 <View style={styles.notificationBadge}>
//                                     <Text style={styles.notificationText}>{notificationCount}</Text>
//                                 </View>
//                             )}
//                         </TouchableOpacity>
//                     </View>
//                 </View>

//                 <View style={styles.summaryContainer}>
//                     <View style={styles.itemContainer}>
//                         <TouchableOpacity onPress={() => navigation.navigate('Services')} style={[styles.button, { backgroundColor: '#007BFF' }]}>
//                             {/* <CountUp start={0} end={dashData?.complaints?.allComplaints} /> */}
//                             <Text>{dashData?.complaints?.allComplaints}</Text>
//                         </TouchableOpacity>
//                         <Text>Total Service</Text>
//                     </View>
//                     <View style={styles.itemContainer}>
//                         <TouchableOpacity onPress={() => navigation.navigate('Services')} style={[styles.button, { backgroundColor: '#DC3545' }]}>
//                             {/* <CountUp start={0} end={dashData?.complaints?.complete} /> */}
//                             <Text>{dashData?.complaints?.complete}</Text>

//                         </TouchableOpacity>
//                         <Text>Completed</Text>
//                     </View>
//                     <View style={styles.itemContainer}>
//                         <TouchableOpacity onPress={() => navigation.navigate('Services')} style={[styles.button, { backgroundColor: '#DC3545' }]}>
//                             {/* <CountUp start={0} end={dashData?.complaints?.assign} /> */}
//                             <Text>{dashData?.complaints?.assign}</Text>

//                         </TouchableOpacity>
//                         <Text>Assigned</Text>
//                     </View>
//                     <View style={styles.itemContainer}>
//                         <TouchableOpacity onPress={() => navigation.navigate('Services')} style={[styles.button, { backgroundColor: '#E3F2FD' }]}>
//                             {/* <CountUp start={0} end={dashData?.complaints?.pending} /> */}
//                             <Text>{dashData?.complaints?.pending}</Text>

//                         </TouchableOpacity>
//                         <Text>Pending</Text>
//                     </View>
//                     <View style={styles.itemContainer}>
//                         <TouchableOpacity onPress={() => navigation.navigate('Services')} style={[styles.button, { backgroundColor: '#E3F2FD' }]}>
//                             {/* <CountUp start={0} end={dashData?.complaints?.pending} /> */}
//                             <Text>{dashData?.complaints?.inProgress}</Text>

//                         </TouchableOpacity>
//                         <Text>In Progress</Text>
//                     </View>
//                     <View style={styles.itemContainer}>
//                         <TouchableOpacity onPress={() => navigation.navigate('Services')} style={[styles.button, { backgroundColor: '#007BFF' }]}>
//                             {/* <CountUp start={0} end={dashData?.complaints?.zeroToOneDays} /> */}
//                             <Text>{dashData?.complaints?.zeroToOneDays}</Text>

//                         </TouchableOpacity>
//                         <Text>0-1 days service</Text>
//                     </View>
//                     <View style={styles.itemContainer}>
//                         <TouchableOpacity onPress={() => navigation.navigate('Services')} style={[styles.button, { backgroundColor: '#007BFF' }]}>
//                             {/* <CountUp start={0} end={dashData?.complaints?.twoToFiveDays} /> */}
//                             <Text>{dashData?.complaints?.twoToFiveDays}</Text>

//                         </TouchableOpacity>
//                         <Text>2-5 days service</Text>
//                     </View>
//                     <View style={styles.itemContainer}>
//                         <TouchableOpacity onPress={() => navigation.navigate('Services')} style={[styles.button, { backgroundColor: '#007BFF' }]}>
//                             {/* <CountUp start={0} end={dashData?.complaints?.moreThanFiveDays} /> */}
//                             <Text>{dashData?.complaints?.moreThanFiveDays}</Text>

//                         </TouchableOpacity>
//                         <Text>More than Five Days Service</Text>
//                     </View>

//                     <TouchableOpacity onPress={() => navigation.navigate('Services')} style={[styles.addButton, { backgroundColor: '#007BFF' }]}>
//                         <Text style={styles.buttonText}>Add Service Request</Text>
//                     </TouchableOpacity>
//                     <TouchableOpacity onPress={() => navigation.navigate('Products')} style={[styles.addButton, { backgroundColor: '#28A745' }]}>
//                         <Text style={styles.buttonText}>Add Product</Text>
//                     </TouchableOpacity>
//                 </View>


//                 <PieChart
//                     data={pieChartData}
//                     width={330}
//                     height={220}
//                     chartConfig={{
//                         backgroundColor: "#e26a00",
//                         backgroundGradientFrom: "#fb8c00",
//                         backgroundGradientTo: "#ffa726",
//                         color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`, // Color for data slices
//                         labelColor: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`, // Color for labels
//                         style: {
//                             borderRadius: 16,
//                         },
//                     }}
//                     accessor="population"
//                     backgroundColor="transparent"
//                     paddingLeft="5"
//                 />
//                 <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.chartContainer}>
//                     <View style={{ width: 400 }}>
//                         <BarChart
//                             data={{
//                                 labels: barChartData.map(item => item.label),
//                                 datasets: [{
//                                     data: barChartData.map(item => item.data)
//                                 }]
//                             }}
//                             width={350}
//                             height={220}
//                             yAxisLabel=""
//                             chartConfig={{
//                                 backgroundColor: "#e26a00",
//                                 backgroundGradientFrom: "#fb8c00",
//                                 backgroundGradientTo: "#ffa726",
//                                 decimalPlaces: 0,
//                                 color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
//                                 labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
//                                 style: {
//                                     borderRadius: 16,
//                                 },
//                                 propsForLabels: {
//                                     fontSize: 7,
//                                 },
//                             }}
//                             style={{
//                                 marginVertical: 8,
//                                 borderRadius: 16,
//                             }}
//                         />
//                     </View>
//                 </ScrollView>

//                 <RecentServicesList data={filterData} userData={userData} />
//                 <NotificationModal
//                     visible={modalVisible}
//                     notifications={notifications}
//                     value={userData}
//                     RefreshData={RefreshData}
//                     message="This is a notification message!"
//                     onClose={hideNotification}
//                 />
//             </View>
//         </ScrollView>

//     );
// };

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         padding: 10,

//         backgroundColor: '#fff',
//         // marginTop: 25,
//         borderRadius: 30
//     },
//     gridContainer: {
//         // flexDirection: 'row',
//         // justifyContent: 'space-between',

//         marginTop: 20,
//         marginBottom: 10,
//     },
//     headerContent: {
//         marginTop: 5,
//         flexDirection: 'row',
//         alignItems: 'center',
//         justifyContent: "space-between"
//     },
//     title: {
//         fontSize: 25,
//         fontFamily: 'outfit-medium',
//         marginHorizontal: 10,
//     },
//     icon: {
//         marginHorizontal: 10,
//         padding: 5,
//         backgroundColor: Colors.GRAY,
//         borderRadius: 50,
//         marginBottom: 10
//     },
//     iconContainer: {
//         position: 'relative',
//         paddingHorizontal: 10,
//     },
//     notificationBadge: {
//         position: 'absolute',
//         right: 10,
//         top: -1,
//         backgroundColor: 'red',
//         borderRadius: 10,
//         width: 20,
//         height: 20,
//         justifyContent: 'center',
//         alignItems: 'center',
//     },
//     notificationText: {
//         color: 'white',
//         fontSize: 12,
//         fontWeight: 'bold',
//     },
//     summaryContainer: {
//         flexDirection: 'row',
//         flexWrap: 'wrap',
//         justifyContent: 'space-between',
//         backgroundColor: '#f0f8ff',
//         borderRadius: 10,
//         padding: 10,
//         marginBottom: 10,
//     },
//     itemContainer: {
//         alignItems: 'center',
//         marginBottom: 10,
//         width: '45%',
//     },
//     button: {
//         width: 50,
//         height: 50,
//         borderRadius: 10,
//         justifyContent: 'center',
//         alignItems: 'center',
//     },
//     addButton: {
//         width: 140,
//         height: 50,
//         borderRadius: 15,
//         justifyContent: 'center',
//         alignItems: 'center',
//     },
//     buttonText: {
//         color: '#fff',
//         fontWeight: 'bold',
//         fontSize: 16,
//     },
//     chartContainer: {
//         flexDirection: 'col',
//         marginHorizontal: 10,
//         marginBottom: 10,
//     },
// });

// export default UserDashboard;



import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Dimensions } from 'react-native';
import { BarChart, PieChart } from 'react-native-chart-kit';
import { useNavigation } from '@react-navigation/native';
import { FontAwesome, MaterialIcons } from '@expo/vector-icons';
import { Colors } from '@/constants/Colors';
import RecentServicesList from './RecentServices';
import { useRouter } from 'expo-router';
import NotificationModal from './Notification';
import { Ionicons } from '@expo/vector-icons';
import Modal from 'react-native-modal';

const screenWidth = Dimensions.get('window').width;

const UserDashboard = (props) => {
  const router = useRouter();
  const navigation = useNavigation();
  const userData = props?.userData;
  const dashData = props?.dashData;
  const complaint = props?.complaints;
  const notifications = props?.notifications;
  const RefreshData = props?.RefreshData;
  const [modalVisible, setModalVisible] = useState(false);


  const showNotification = () => setModalVisible(true);
  const hideNotification = () => setModalVisible(false);

  const unreadNoti = userData?.role === 'ADMIN'
    ? notifications?.filter((item) => item?.adminStatus === 'UNREAD')
    : userData?.role === 'BRAND'
      ? notifications?.filter((item) => item?.brandStatus === 'UNREAD')
      : userData?.role === 'SERVICE'
        ? notifications?.filter((item) => item?.serviceCenterStatus === 'UNREAD')
        : userData?.role === 'TECHNICIAN'
          ? notifications?.filter((item) => item?.technicianStatus === 'UNREAD')
          : userData?.role === 'USER'
            ? notifications?.filter((item) => item?.userStatus === 'UNREAD')
            : userData?.role === 'DEALER'
              ? notifications?.filter((item) => item?.userStatus === 'UNREAD')
              : [];

  const notificationCount = unreadNoti?.length;

  const filterData = userData?.role === 'ADMIN'
    ? dashData
    : userData?.role === 'BRAND'
      ? complaint.filter((item) => item?.brandId === userData._id)
      : userData?.role === 'USER'
        ? complaint.filter((item) => item?.userId === userData._id)
        : userData?.role === 'SERVICE'
          ? complaint.filter((item) => item?.assignServiceCenterId === userData._id)
          : userData?.role === 'TECHNICIAN'
            ? complaint.filter((item) => item?.technicianId === userData._id)
            : userData?.role === 'DEALER'
              ? complaint.filter((item) => item?.dealerId === userData._id)
              : [];

  // const data = filterData?.map((item, index) => ({ ...item, i: index + 1 }));

  const pieChartData = [
    { name: 'AllComplaints', population: dashData?.complaints?.allComplaints || 0, color: 'rgba(131, 167, 234, 1)', legendFontColor: '#7F7F7F', legendFontSize: 15 },
    { name: 'Assign', population: dashData?.complaints?.assign || 0, color: '#F00', legendFontColor: '#7F7F7F', legendFontSize: 15 },
    { name: 'Pending', population: dashData?.complaints?.pending || 0, color: 'yellow', legendFontColor: '#7F7F7F', legendFontSize: 15 },
    { name: 'Complete', population: dashData?.complaints?.complete || 0, color: 'green', legendFontColor: '#7F7F7F', legendFontSize: 15 },
    { name: 'PartPending', population: dashData?.complaints?.partPending || 0, color: 'purple', legendFontColor: '#7F7F7F', legendFontSize: 15 },
  ];

  const barChartData = {
    labels: ['All', 'Assign', 'Pending', 'Complete', 'PartPending'],
    datasets: [{
      data: [
        dashData?.complaints?.allComplaints || 0,
        dashData?.complaints?.assign || 0,
        dashData?.complaints?.pending || 0,
        dashData?.complaints?.complete || 0,
        dashData?.complaints?.partPending || 0,
      ]
    }]
  };


  const userProduct = props?.products?.filter((f) => f?.userId === userData?._id)
  // console.log(userProduct);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [productDetails, setProductDetails] = useState("");

  const handleDetails = (item) => {
    setProductDetails(item)
    setEditModalOpen(true);
  };
  const handleEditModalClose = () => {
    setEditModalOpen(false);
  };

  // console.log("props?.userData",props?.dashData);


  return (
    <ScrollView>
      <View style={styles.container}>

        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.navigate("Profile")}>
            <MaterialIcons name="person" size={28} color="white" />
          </TouchableOpacity>
          <Text style={styles.title}>Dashboard</Text>
          <TouchableOpacity onPress={() => setModalVisible(true)}>
            <FontAwesome name="bell" size={24} color="white" />
            {notificationCount > 0 && (
              <View style={styles.badge}>
                <Text style={styles.badgeText}>{notificationCount}</Text>
              </View>
            )}
          </TouchableOpacity>
        </View>
        <View style={styles.cardContainer}>
        <TouchableOpacity onPress={() => navigation.navigate('Services')} style={[styles.addButton, { backgroundColor: '#007BFF' }]}>
          <Text style={styles.buttonText}>Add Service Request</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Products')} style={[styles.addButton, { backgroundColor: '#28A745' }]}>
          <Text style={styles.buttonText}>Add Product</Text>
        </TouchableOpacity>
        </View>
        {/* Service Summary Cards */}
        <View style={styles.cardContainer}>
          {[

            { label: "Pending", value: dashData?.complaints?.pending, color: "#ea4335" },
            { label: "In Progress", value: dashData?.complaints?.inProgress, color: "#4285f4" },
            { label: "Assigned", value: dashData?.complaints?.assign, color: "#a142f4" },
            { label: "Part Pending", value: dashData?.complaints?.partPending, color: "#ff9800" },

            { label: "Final Verification", value: dashData?.complaints?.finalVerification, color: "#00bcd4" },
            { label: "Cancel", value: dashData?.complaints?.cancel, color: "#616161" }, // Gray for cancel
            { label: "Completed", value: dashData?.complaints?.complete, color: "#34a853" },

            { label: "Total Service", value: dashData?.complaints?.allComplaints, color: "#f4b400" },

            { label: "Schedule", value: dashData?.complaints?.schedule, color: "#2c3e50" }, // Dark blue for schedule
            { label: "Schedule Upcoming", value: dashData?.complaints?.scheduleUpcomming, color: "#34495e" }, // Slightly darker blue

          ]
            // .filter((item) => item.value > 0) // Hide zero-value cards
            .map((item, index) => (
              <TouchableOpacity
                key={index}
                style={[styles.card, { backgroundColor: item.color }]}
                onPress={() => navigation?.navigate("Services")}
              >
                <Text style={styles.cardValue}>{item.value}</Text>
                <Text style={styles.cardLabel}>{item.label}</Text>
              </TouchableOpacity>
            ))}
        </View>
        <View style={styles.metricsContainerDaywie}>
          <Text style={styles.sectionTitle}>Daywise Pending Complaints</Text>
        </View>
        <View style={styles.cardContainer}>

          {[

            { label: "Zero to One Days", value: dashData?.complaints?.zeroToOneDays, color: "#8e44ad" }, // Purple
            { label: "Two to Five Days", value: dashData?.complaints?.twoToFiveDays, color: "#3498db" }, // Blue
            { label: "More than Five Days", value: dashData?.complaints?.moreThanFiveDays, color: "#e67e22" }, // Orange

          ]
            // .filter((item) => item.value > 0) // Hide zero-value cards
            .map((item, index) => (
              <TouchableOpacity
                key={index}
                style={[styles.card, { backgroundColor: item.color }]}
                onPress={() => navigation?.navigate("Services")}
              >
                <Text style={styles.cardValue}>{item.value}</Text>
                <Text style={styles.cardLabel}>{item.label}</Text>
              </TouchableOpacity>
            ))}
        </View>
        <View style={styles.metricsContainerDaywie}>
          <Text style={styles.sectionTitle}>Daywise Pending Complaints</Text>
        </View>
        <View style={styles.cardContainer}>
          {[

            { label: "Zero to One Days (Part Pending)", value: dashData?.complaints?.zeroToOneDaysPartPending, color: "#9b59b6" }, // Light Purple
            { label: "Two to Five Days (Part Pending)", value: dashData?.complaints?.twoToFiveDaysPartPending, color: "#2980b9" }, // Darker Blue
            { label: "More than Five Days (Part Pending)", value: dashData?.complaints?.moreThanFiveDaysPartPending, color: "#d35400" }, // Dark Orange
          ]
            // .filter((item) => item.value > 0) // Hide zero-value cards
            .map((item, index) => (
              <TouchableOpacity
                key={index}
                style={[styles.card, { backgroundColor: item.color }]}
                onPress={() => navigation?.navigate("Services")}
              >
                <Text style={styles.cardValue}>{item.value || 0}</Text>
                <Text style={styles.cardLabel}>{item.label}</Text>
              </TouchableOpacity>
            ))}
        </View>

        <View>
          {userProduct?.map((item, index) => (
            <View key={item?._id} style={styles.containerP}>
              <View style={styles.itemContainerP}>
                <TouchableOpacity
                  onPress={() => handleDetails(item)}
                  style={styles.button}
                  activeOpacity={0.7}
                >
                  <View style={styles.iconContainerP}>
                    <Ionicons name="pricetag" size={24} color="white" />
                  </View>
                  <View style={styles.textContainerP}>
                    <Text style={styles.productName}>Product Name: {item?.productName}</Text>
                    <View style={[styles.warrantyStatus, { flexDirection: 'row', alignItems: 'center' }]}>
                      <Ionicons name="shield-checkmark" size={16} color="white" />
                      <Text style={{ marginLeft: 4, color: "white" }}>Under Warranty: {item?.warrantyStatus ? "Yes" : "No"}</Text>
                    </View>

                  </View>
                </TouchableOpacity>
              </View>
            </View>
          ))}
        </View>
        <View>
          {userProduct?.map((item, index) => (
            <View key={item?._id} style={styles.containerP}>
              <View style={styles.itemContainerP}>
                <TouchableOpacity
                  onPress={() => handleDetails(item)}
                  style={styles.button}
                  activeOpacity={0.7}
                >
                  <View style={styles.iconContainerP}>
                    <Ionicons name="pricetag" size={24} color="white" />
                  </View>
                  <View style={styles.textContainerP}>
                    <Text style={styles.productName}>Product Name: {item?.productName}</Text>
                    <View style={[styles.warrantyStatus, { flexDirection: 'row', alignItems: 'center' }]}>
                      <Ionicons name="shield-checkmark" size={16} color="white" />
                      <Text style={{ marginLeft: 4, color: "white" }}>Under Warranty: {item?.warrantyStatus ? "Yes" : "No"}</Text>
                    </View>

                  </View>
                </TouchableOpacity>
              </View>
            </View>
          ))}
        </View>




        <RecentServicesList data={filterData} userData={userData} />


        <NotificationModal
          visible={modalVisible}
          notifications={notifications}
          value={userData}
          RefreshData={RefreshData}
          message="This is a notification message!"
          onClose={hideNotification}
        />
        <Modal isVisible={editModalOpen} onBackdropPress={handleEditModalClose}>

          <View style={styles.modalContent}>
            <ScrollView style={styles.scrollView}>
              <Text style={styles.headerModal}>Product Details</Text>

              <View style={styles.detailRow}>
                <Text style={styles.label}>Product Name:</Text>
                <Text style={styles.value}>{productDetails?.productName || '-'}</Text>
              </View>

              <View style={styles.detailRow}>
                <Text style={styles.label}>Brand:</Text>
                <Text style={styles.value}>{productDetails?.productBrand || '-'}</Text>
              </View>

              <View style={styles.detailRow}>
                <Text style={styles.label}>Model No:</Text>
                <Text style={styles.value}>{productDetails?.modelNo || '-'}</Text>
              </View>

              <View style={styles.detailRow}>
                <Text style={styles.label}>Serial No:</Text>
                <Text style={styles.value}>{productDetails?.serialNo || '-'}</Text>
              </View>

              <View style={styles.detailRow}>
                <Text style={styles.label}>Purchase Date:</Text>
                <Text style={styles.value}>{productDetails?.purchaseDate || '-'}</Text>
              </View>

              <View style={styles.detailRow}>
                <Text style={styles.label}>Warranty Status:</Text>
                <Text style={styles.value}>
                  {productDetails?.warrantyStatus ? 'In Warranty' : 'Out of Warranty'}
                </Text>
              </View>

              <View style={styles.detailRow}>
                <Text style={styles.label}>Warranty Years:</Text>
                <Text style={styles.value}>{productDetails?.warrantyYears || '-'}</Text>
              </View>

              <View style={styles.detailRow}>
                <Text style={styles.label}>Category:</Text>
                <Text style={styles.value}>{productDetails?.categoryName || '-'}</Text>
              </View>

              <View style={styles.detailRow}>
                <Text style={styles.label}>Description:</Text>
                <Text style={styles.value}>{productDetails?.productDescription || '-'}</Text>
              </View>

              <View style={styles.detailRow}>
                <Text style={styles.label}>Status:</Text>
                <Text style={[styles.value, productDetails?.status === 'ACTIVE' ? styles.activeStatus : styles.inactiveStatus]}>
                  {productDetails?.status || '-'}
                </Text>
              </View>

              <View style={styles.detailRow}>
                <Text style={styles.label}>User Name:</Text>
                <Text style={styles.value}>{productDetails?.userName || '-'}</Text>
              </View>
            </ScrollView>
          </View>
        </Modal>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({

  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  metricsContainerDaywie: {
    paddingLeft: 16,
  },
  button: {
            width: 50,
            height: 50,
            
            justifyContent: 'center',
            alignItems: 'center',
            elevation: 3,
        },
        addButton: {
            width: 140,
            height: 50,
            borderRadius: 8,
            justifyContent: 'center',
            alignItems: 'center',
        },
        buttonText: {
            color: '#fff',
            fontWeight: 'bold',
            fontSize: 16,
        },
  title: {
    fontSize: 25,
    fontFamily: 'outfit-medium',
    color: '#333',
  },
  icon: {
    padding: 5,
    backgroundColor: Colors.GRAY,
    borderRadius: 50,
  },
  iconContainer: {
    position: 'relative',
    paddingHorizontal: 10,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 15,
    paddingVertical: 10,
    backgroundColor: "black", // Black background
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "white", // White text
  },
  notificationContainer: {
    position: "relative",
  },
  badge: {
    position: "absolute",
    top: -5,
    right: -5,
    backgroundColor: "red",
    width: 18,
    height: 18,
    borderRadius: 9,
    justifyContent: "center",
    alignItems: "center",
  },
  badgeText: {
    color: "white",
    fontSize: 12,
    fontWeight: "bold",
  },
  cardContainer: {
    padding: 16,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  card: {
    width: "48%",
    padding: 16,
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 12,
    elevation: 3,
  },
  cardValue: {
    fontSize: 22,
    fontWeight: "bold",
    color: "white",
  },
  cardLabel: {
    fontSize: 14,
    color: "white",
    marginTop: 4,
  },
  metricsContainer: {
    padding: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
  },
  metricsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  metricBox: {
    backgroundColor: "white",
    borderRadius: 8,
    padding: 16,
    alignItems: "center",
    width: "30%",
    elevation: 2,
  },
  metricValue: {
    fontSize: 20,
    fontWeight: "bold",
  },
  metricLabel: {
    fontSize: 14,
    color: "#666",
  },
  chartContainer: {
    padding: 16,
    alignItems: "center",
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    maxHeight: '80%',
  },
  scrollView: {
    width: '100%',
  },
  headerModal: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
    textAlign: 'center',
    color: '#333',
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    paddingVertical: 5,
  },
  label: {
    fontWeight: 'bold',
    color: '#555',
  },
  value: {
    color: '#333',
  },
  activeStatus: {
    color: 'green',
    fontWeight: 'bold',
  },
  inactiveStatus: {
    color: 'red',
    fontWeight: 'bold',
  },
  notificationBadge: {
    position: 'absolute',
    right: 0,
    top: -5,
    backgroundColor: 'red',
    borderRadius: 10,
    width: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  notificationText: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
  },
  summaryContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  itemContainer: {
    width: '48%',
    marginBottom: 10,
  },
  button: {
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
  },
  barChart: {
    marginVertical: 8,
    borderRadius: 16,
  },
  containerP: {
    flex: 1,
    padding: 10,
    borderRadius: 10,
    backgroundColor: '#17A2B8',
    margin: 20 // Light background for contrast
  },
  itemContainerP: {
    marginBottom: 15,
    // marginTop: 15

  },
  buttonP: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: "#17A2B8",
    borderRadius: 10,
    padding: 15,
    elevation: 3, // Adds shadow on Android
    shadowColor: '#000', // Adds shadow on iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  iconContainerP: {
    marginRight: 10,
  },
  textContainerP: {
    flex: 1,
  },
  productName: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  warrantyStatus: {
    color: 'white',
    fontSize: 14,
    display: "flex",
    alignItems: "center",

  },
});

export default UserDashboard;
