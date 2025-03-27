// import React, { useEffect, useState } from 'react';
// import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';

// import { BarChart, PieChart } from 'react-native-chart-kit';
// import { useNavigation } from '@react-navigation/native';
// import { FontAwesome, MaterialIcons } from '@expo/vector-icons';
// import { Colors } from '@/constants/Colors'
// import http_request from '../http_request';
// import { useRouter } from 'expo-router';
// import NotificationModal from './Notification';
// import RecentServicesList from './RecentServices';

// const TechnicianDashboard = (props) => {
//     const router = useRouter();
//     const navigation = useNavigation();
//     const userData = props?.userData; // Technician's user data
//     const dashData = props?.dashData; // Dashboard data for counts and summaries
//     const [complaint, setComplaint] = useState([]); // State to hold complaint data
//     const [refresh, setRefresh] = useState(""); // State for triggering data refresh
//     const [averageTAT, setAverageTAT] = useState(0); // State for average TAT
//     const [averageClosingTime, setAverageClosingTime] = useState(0); // State for average closing time (CT)
//     const [averageResponseTime, setAverageResponseTime] = useState(0); // State for average response time (RT)
//     const [tatPercentage, setTatPercentage] = useState(0); // State for TAT percentage
//     const [ctPercentage, setCtPercentage] = useState(0); // State for CT percentage
//     const [rtPercentage, setRtPercentage] = useState(0); // State for RT percentage
  
//     const actualTAT = 12;
//     const actualCT = 6;
//     const actualRT = 3;
//     const targetTAT = 24;
//     const targetCT = 12;
//     const targetRT = 6;
//     // Fetch data when component mounts or refresh state changes
//     useEffect(() => {
//       getAllComplaint();
//     }, [refresh]);
  

   

//     // Function to calculate TAT in hours from created and updated timestamps
//     const calculateTAT = (createdAt, updatedAt) => {
//       const created = new Date(createdAt);
//       const updated = new Date(updatedAt);
//       return (updated - created) / (1000 * 60 * 60); // Convert milliseconds to hours
//     };
 
//     // Function to calculate CT in hours from assign and update timestamps
//     const calculateCT = (assignTime, updateTime) => {
//       const assignDate = new Date(assignTime);
//       const updateDate = new Date(updateTime);
//       return (updateDate - assignDate) / (1000 * 60 * 60); // Convert milliseconds to hours
//     };
  
//     // Function to fetch all complaints for the technician
//     const getAllComplaint = async () => {
//       try {
//         let response = await http_request.get("/getAllComplaint"); // Assuming endpoint to fetch complaints
//         let { data } = response;
  
//         // Filter complaints assigned to this technician
//         const techComp = data.filter((item) => item?.technicianId === userData._id);
  
//         // Filter completed complaints for TAT calculation
//         const completedComplaints1 = techComp.filter(c => c.status === 'COMPLETED');
//         const tatData = completedComplaints1.map(c => calculateTAT(c.createdAt, c.updatedAt));
//         const totalTAT = tatData.reduce((sum, tat) => sum + tat, 0);
//         const avgTAT = tatData.length ? (totalTAT / tatData.length).toFixed(2) : 0;
  
//         const tat = avgTAT <= 24 ? "100" : avgTAT <= 32 ? "80" : avgTAT <= 48 ? "60" : avgTAT <= 64 ? "40" : avgTAT <= 72 ? "30" : avgTAT <= 100 ? "10" : "5"
  
//         setAverageTAT(tat);
  
//         // Filter completed complaints with valid assign and update times for CT calculation
//         const completedComplaints = techComp.filter(c =>
//           c.status === 'COMPLETED' &&
//           c.assignTechnicianTime &&
//           c.updatedAt &&
//           !isNaN(new Date(c.assignTechnicianTime)) &&
//           !isNaN(new Date(c.updatedAt))
//         );
  
//         const ctData = completedComplaints.map(c => calculateCT(c.assignTechnicianTime, c.updatedAt));
//         const totalCT = ctData.reduce((sum, tat) => sum + tat, 0);
//         const avgCT = ctData.length ? (totalCT / ctData.length).toFixed(2) : 0;
//         const ct = avgCT <= 3 ? "100" : avgCT <= 6 ? "80" : avgCT <= 8 ? "60" : avgCT <= 12 ? "40" : avgCT <= 17 ? "30" : avgCT <= 24 ? "10" : "5"
//         const rt = avgCT <= 3 ? "100" : avgCT <= 6 ? "80" : avgCT <= 8 ? "60" : avgCT <= 12 ? "40" : avgCT <= 17 ? "30" : avgCT <= 24 ? "10" : "5"
//         setAverageClosingTime(ct);
//         setAverageResponseTime(rt);
  
//         // Calculate TAT percentage
//         const tatPercent = completedComplaints1.length ? (avgTAT / targetTAT) * 100 : 0;
//         setTatPercentage(tatPercent.toFixed(2));
  
//         // Calculate CT percentage
//         const ctPercent = completedComplaints?.length ? (avgCT / targetCT) * 100 : 0;
//         setCtPercentage(ctPercent.toFixed(2));
  
//         // Calculate RT percentage
//         const rtPercent = completedComplaints.length ? (avgCT / targetRT) * 100 : 0;
//         setRtPercentage(rtPercent.toFixed(2));
  
//         setComplaint(data); // Store all fetched complaints
//       } catch (err) {
//         console.log(err); // Handle errors if any
//       }
//     };
  
//     const notifications = props?.notifications;z
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

//     // Filter complaints based on user role for displaying in the list
//     const filterData = userData?.role === "ADMIN" ? complaint
//       : userData?.role === "BRAND" ? complaint.filter((item) => item?.brandId === userData._id)
//         : userData?.role === "USER" ? complaint.filter((item) => item?.userId === userData._id)
//           : userData?.role === "SERVICE" ? complaint.filter((item) => item?.assignServiceCenterId === userData._id)
//             : userData?.role === "TECHNICIAN" ? complaint.filter((item) => item?.technicianId === userData._id)
//               : userData?.role === "DEALER" ? complaint.filter((item) => item?.dealerId === userData._id)
//                 : complaint;
  
//     // Add index to filtered data for rendering purposes
//     const data = filterData?.map((item, index) => ({ ...item, i: index + 1 }));
  
//     // Function to trigger data refresh
//     // const RefreshData = (data) => {
//     //   setRefresh(data);
//     // };

//     const pieChartData = [
//         { name: "AllComplaints", population: dashData?.complaints?.allComplaints || 0, color: "rgba(131, 167, 234, 1)", legendFontColor: "#7F7F7F", legendFontSize: 15 },
//         { name: "Assign", population: dashData?.complaints?.assign || 0, color: "#F00", legendFontColor: "#7F7F7F", legendFontSize: 15 },
//         { name: "Pending", population: dashData?.complaints?.pending || 0, color: "yellow", legendFontColor: "#7F7F7F", legendFontSize: 15 },
//         { name: "Complete", population: dashData?.complaints?.complete || 0, color: "green", legendFontColor: "#7F7F7F", legendFontSize: 15 },
//         { name: "PartPending", population: dashData?.complaints?.partPending || 0, color: "purple", legendFontColor: "#7F7F7F", legendFontSize: 15 },
//         { name: "InProgress", population: dashData?.complaints?.inProgress || 0, color: "purple", legendFontColor: "#7F7F7F", legendFontSize: 15 },
//     ];

//     // Example bar chart data
//     const barChartData = [
//         { label: "AllComplaints", data: dashData?.complaints?.allComplaints || 0 },
//         { label: "Assign", data: dashData?.complaints?.assign || 0 },
//         { label: "Pending", data: dashData?.complaints?.pending || 0 },
//         { label: "Complete", data: dashData?.complaints?.complete || 0 },
//         { label: "PartPending", data: dashData?.complaints?.partPending || 0 },
//         { label: "InProgress", data: dashData?.complaints?.inProgress || 0 },
//     ];

//     return (
//         <ScrollView>
//             <View style={styles.container}>
//                 {/* Replace with your React Native components and styling */}
//                 <View style={styles.headerContent}>
//                     {/* <TouchableOpacity onPress={() => router.push("Technician/Profile")}  > */}
//                     <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
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
//                         <TouchableOpacity onPress={() => navigation.navigate('Services')} style={[styles.button, { backgroundColor: '#FFD700' }]}>
//                             {/* <CountUp start={0} end={dashData?.complaints?.allComplaints} /> */}
//                             <Text>{dashData?.complaints?.allComplaints}</Text>
//                         </TouchableOpacity>
//                         <Text>Total Service</Text>
//                     </View>
//                     <View style={styles.itemContainer}>
//                         <TouchableOpacity onPress={() => navigation.navigate('Services')} style={[styles.button, { backgroundColor: '#FF6347' }]}>
//                             {/* <CountUp start={0} end={dashData?.complaints?.complete} /> */}
//                             <Text>{dashData?.complaints?.complete}</Text>

//                         </TouchableOpacity>
//                         <Text>Completed</Text>
//                     </View>
//                     <View style={styles.itemContainer}>
//                         <TouchableOpacity onPress={() => navigation.navigate('Services')} style={[styles.button, { backgroundColor: '#FF6347' }]}>
//                             {/* <CountUp start={0} end={dashData?.complaints?.assign} /> */}
//                             <Text>{dashData?.complaints?.assign}</Text>

//                         </TouchableOpacity>
//                         <Text>Assigned</Text>
//                     </View>
//                     <View style={styles.itemContainer}>
//                         <TouchableOpacity onPress={() => navigation.navigate('Services')} style={[styles.button, { backgroundColor: '#90EE90' }]}>
//                             {/* <CountUp start={0} end={dashData?.complaints?.pending} /> */}
//                             <Text>{dashData?.complaints?.pending}</Text>

//                         </TouchableOpacity>
//                         <Text>Pending</Text>
//                     </View>
//                     <View style={styles.itemContainer}>
//                         <TouchableOpacity onPress={() => navigation.navigate('Services')} style={[styles.button, { backgroundColor: '#90EE90' }]}>
//                             {/* <CountUp start={0} end={dashData?.complaints?.pending} /> */}
//                             <Text>{dashData?.complaints?.inProgress}</Text>

//                         </TouchableOpacity>
//                         <Text>In Progress</Text>
//                     </View>
//                     <View style={styles.itemContainer}>
//                         <TouchableOpacity onPress={() => navigation.navigate('Services')} style={[styles.button, { backgroundColor: '#FFD700' }]}>
//                             {/* <CountUp start={0} end={dashData?.complaints?.zeroToOneDays} /> */}
//                             <Text>{dashData?.complaints?.zeroToOneDays}</Text>

//                         </TouchableOpacity>
//                         <Text>0-1 days service</Text>
//                     </View>
//                     <View style={styles.itemContainer}>
//                         <TouchableOpacity onPress={() => navigation.navigate('Services')} style={[styles.button, { backgroundColor: '#FFD700' }]}>
//                             {/* <CountUp start={0} end={dashData?.complaints?.twoToFiveDays} /> */}
//                             <Text>{dashData?.complaints?.twoToFiveDays}</Text>

//                         </TouchableOpacity>
//                         <Text>2-5 days service</Text>
//                     </View>
//                     <View style={styles.itemContainer}>
//                         <TouchableOpacity onPress={() => navigation.navigate('Services')} style={[styles.button, { backgroundColor: '#FFD700' }]}>
//                             {/* <CountUp start={0} end={dashData?.complaints?.moreThanFiveDays} /> */}
//                             <Text>{dashData?.complaints?.moreThanFiveDays}</Text>

//                         </TouchableOpacity>
//                         <Text>More than Five Days Service</Text>
//                     </View>
//                     <View style={styles.itemContainer}>
//                         <TouchableOpacity onPress={() => navigation.navigate('Services')} style={[styles.button, { backgroundColor: '#FFD700' }]}>
//                             {/* <CountUp start={0} end={dashData?.complaints?.moreThanFiveDays} /> */}
//                             <Text>{averageClosingTime}</Text>

//                         </TouchableOpacity>
//                         <Text>CT</Text>
//                     </View>
//                     <View style={styles.itemContainer}>
//                         <TouchableOpacity onPress={() => navigation.navigate('Services')} style={[styles.button, { backgroundColor: '#FFD700' }]}>
//                             {/* <CountUp start={0} end={dashData?.complaints?.moreThanFiveDays} /> */}
//                             <Text>{averageResponseTime}</Text>

//                         </TouchableOpacity>
//                         <Text>RT</Text>
//                     </View>
//                     <View style={styles.itemContainer}>
//                         <TouchableOpacity onPress={() => navigation.navigate('Services')} style={[styles.button, { backgroundColor: '#FFD700' }]}>
//                             {/* <CountUp start={0} end={dashData?.complaints?.moreThanFiveDays} /> */}
//                             <Text>{averageTAT}</Text>

//                         </TouchableOpacity>
//                         <Text>TAT</Text>
//                     </View>
//                     <View style={styles.itemContainer}>
//                         <TouchableOpacity onPress={() => navigation.navigate('Wallet')} style={[styles.button, { backgroundColor: '#FFD700' }]}>
//                             {/* <CountUp start={0} end={dashData?.complaints?.moreThanFiveDays} /> */}
//                             <Text>{dashData?.complaints?.moreThanFiveDays}</Text>

//                         </TouchableOpacity>
//                         <Text>Wallet</Text>
//                     </View>

                   
//                 </View>

// {/* 
//                 {pieChartData && pieChartData.length > 0 && (
//   <PieChart
//     data={pieChartData}
//     width={screenWidth * 0.9}
//     height={220}
//     chartConfig={{
//       backgroundColor: '#e26a00',
//       backgroundGradientFrom: '#fb8c00',
//       backgroundGradientTo: '#ffa726',
//       color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
//       labelColor: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
//     }}
//     accessor="population"
//     backgroundColor="transparent"
//     paddingLeft="15"
//   />
// )}

// {barChartData && barChartData.datasets && barChartData.datasets.length > 0 && (
//   <ScrollView horizontal showsHorizontalScrollIndicator={false}>
//     <BarChart
//       data={barChartData}
//       width={screenWidth * 1.4}
//       height={220}
//       chartConfig={{
//         backgroundColor: '#e26a00',
//         backgroundGradientFrom: '#fb8c00',
//         backgroundGradientTo: '#ffa726',
//         color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
//         labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
//       }}
//       style={styles.barChart}
//     />
//   </ScrollView>
// )} */}


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
//         // marginTop:25,
//         borderRadius:30
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
//       },
//       notificationBadge: {
//         position: 'absolute',
//         right: 10,
//         top: -1,
//         backgroundColor: 'red',
//         borderRadius: 10,
//         width: 20,
//         height: 20,
//         justifyContent: 'center',
//         alignItems: 'center',
//       },
//       notificationText: {
//         color: 'white',
//         fontSize: 12,
//         fontWeight: 'bold',
//       },
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
//         borderRadius: 40,
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

// export default TechnicianDashboard;

import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, ScrollView, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { FontAwesome, MaterialIcons } from "@expo/vector-icons";
import { PieChart } from "react-native-chart-kit";
import http_request from "../http_request";
import NotificationModal from "./Notification";
import RecentServicesList from "./RecentServices";
import WalletDashboard from "./walletDashSection";

const TechnicianDashboard = ({ userData, dashData, notifications,RefreshData }) => {
  const navigation = useNavigation();
  const [averageTAT, setAverageTAT] = useState(0);
  const [averageRT, setAverageRT] = useState(0);
  const [averageCT, setAverageCT] = useState(0);
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    getAllComplaint();
  }, []);
// console.log(dashData);

  const getAllComplaint = async () => {
    try {
      const response = await http_request.get(
        `/getAllTatByServiceCenter?assignServiceCenterId=${userData?._id}`
      );
      const { data } = response;
      setAverageTAT(data?.overallTATPercentage || 0);
      setAverageRT(data?.overallRTPercentage || 0);
      setAverageCT(data?.overallCTPercentage || 0);
    } catch (err) {
      console.error("Error fetching complaints:", err);
    }
  };

  const unreadNoti = userData?.user?.role==="SERVICE" ?notifications?.filter(
    (item) => item?.serviceCenterStatus === "UNREAD"
  ):notifications?.filter(
    (item) => item?.technicianStatus === "UNREAD"
  );
  const notificationCount = unreadNoti?.length;
  
// console.log(notifications);

  const chartData = [
    { name: "Assigned", population: dashData?.complaints?.assign ?? 0, color: "#FF6347" },
    { name: "Pending", population: dashData?.complaints?.pending ?? 0, color: "#FFD700" },
    { name: "Completed", population: dashData?.complaints?.complete ?? 0, color: "#32CD32" },
  ];
  
 
  
 
  return (
    <ScrollView style={styles.container}>
      {/* Header */}
     
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
      <WalletDashboard />
  {/* Performance Metrics */}
  <View style={styles.metricsContainer}>
        <Text style={styles.sectionTitle}>Performance Metrics</Text>
        <View style={styles.metricsRow}>
          {[
            { label: "TAT ", value: averageTAT, color: "#4285f4" },
            { label: "RT ", value: averageRT, color: "#34a853" },
            { label: "CT ", value: averageCT, color: "#ea4335" },
          ].map((metric, index) => (
            <View key={index} style={styles.metricBox}>
              <Text style={[styles.metricValue, { color: metric.color }]}>{metric.value}</Text>
              <Text style={styles.metricLabel}>{metric.label}</Text>
            </View>
          ))}
        </View>
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
    { label: "Last Week", value: dashData?.complaints?.lastWeek?.allComplaints, color: "#795548" }, // Brown for last week
    { label: "Zero to One Days", value: dashData?.complaints?.zeroToOneDays, color: "#8e44ad" }, // Purple
    { label: "Two to Five Days", value: dashData?.complaints?.twoToFiveDays, color: "#3498db" }, // Blue
    { label: "More than Five Days", value: dashData?.complaints?.moreThanFiveDays, color: "#e67e22" }, // Orange
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
        <Text style={styles.cardValue}>{item.value}</Text>
        <Text style={styles.cardLabel}>{item.label}</Text>
      </TouchableOpacity>
    ))}
</View>


    

      {/* Pie Chart */}
      {/* <View style={styles.chartContainer}>
        <Text style={styles.sectionTitle}>Service Breakdown</Text>
        <PieChart
    data={chartData}
    width={400} 
    height={250}
    chartConfig={{
      backgroundColor: "transparent",
      backgroundGradientFrom: "#fff",
      backgroundGradientTo: "#fff",
      color: (opacity = 1) => `rgba(0, 0, 0, ${opacity ?? 1})`,
    }}
    accessor="population"
    backgroundColor="transparent"
    paddingLeft="15"
    absolute
  />
      </View> */}

      {/* Recent Services */}
      <RecentServicesList services={dashData?.recentServices} />

      {/* Notification Modal */}
      {modalVisible && <NotificationModal notifications={notifications} RefreshData={RefreshData} value={userData}   visible={modalVisible} onClose={() => setModalVisible(false)} />}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#f8f9fa",
    flex: 1,
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
});

export default TechnicianDashboard;
