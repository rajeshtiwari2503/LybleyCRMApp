import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';

import { BarChart, PieChart } from 'react-native-chart-kit';
import { useNavigation } from '@react-navigation/native';
import { FontAwesome, MaterialIcons } from '@expo/vector-icons';
import { Colors } from '@/constants/Colors'
import http_request from '../http_request';
// import RecentServicesList from '../complaint/RecentServices';

const TechnicianDashboard = (props) => {
    const navigation = useNavigation();
    const userData = props?.userData; // Technician's user data
    const dashData = props?.dashData; // Dashboard data for counts and summaries
    const [complaint, setComplaint] = useState([]); // State to hold complaint data
    const [refresh, setRefresh] = useState(""); // State for triggering data refresh
    const [averageTAT, setAverageTAT] = useState(0); // State for average TAT
    const [averageClosingTime, setAverageClosingTime] = useState(0); // State for average closing time (CT)
    const [averageResponseTime, setAverageResponseTime] = useState(0); // State for average response time (RT)
    const [tatPercentage, setTatPercentage] = useState(0); // State for TAT percentage
    const [ctPercentage, setCtPercentage] = useState(0); // State for CT percentage
    const [rtPercentage, setRtPercentage] = useState(0); // State for RT percentage
  
    const actualTAT = 12;
    const actualCT = 6;
    const actualRT = 3;
    const targetTAT = 24;
    const targetCT = 12;
    const targetRT = 6;
    // Fetch data when component mounts or refresh state changes
    useEffect(() => {
      getAllComplaint();
    }, [refresh]);
  
    // Function to calculate TAT in hours from created and updated timestamps
    const calculateTAT = (createdAt, updatedAt) => {
      const created = new Date(createdAt);
      const updated = new Date(updatedAt);
      return (updated - created) / (1000 * 60 * 60); // Convert milliseconds to hours
    };
 
    // Function to calculate CT in hours from assign and update timestamps
    const calculateCT = (assignTime, updateTime) => {
      const assignDate = new Date(assignTime);
      const updateDate = new Date(updateTime);
      return (updateDate - assignDate) / (1000 * 60 * 60); // Convert milliseconds to hours
    };
  
    // Function to fetch all complaints for the technician
    const getAllComplaint = async () => {
      try {
        let response = await http_request.get("/getAllComplaint"); // Assuming endpoint to fetch complaints
        let { data } = response;
  
        // Filter complaints assigned to this technician
        const techComp = data.filter((item) => item?.technicianId === userData._id);
  
        // Filter completed complaints for TAT calculation
        const completedComplaints1 = techComp.filter(c => c.status === 'COMPLETED');
        const tatData = completedComplaints1.map(c => calculateTAT(c.createdAt, c.updatedAt));
        const totalTAT = tatData.reduce((sum, tat) => sum + tat, 0);
        const avgTAT = tatData.length ? (totalTAT / tatData.length).toFixed(2) : 0;
  
        const tat = avgTAT <= 24 ? "100" : avgTAT <= 32 ? "80" : avgTAT <= 48 ? "60" : avgTAT <= 64 ? "40" : avgTAT <= 72 ? "30" : avgTAT <= 100 ? "10" : "5"
  
        setAverageTAT(tat);
  
        // Filter completed complaints with valid assign and update times for CT calculation
        const completedComplaints = techComp.filter(c =>
          c.status === 'COMPLETED' &&
          c.assignTechnicianTime &&
          c.updatedAt &&
          !isNaN(new Date(c.assignTechnicianTime)) &&
          !isNaN(new Date(c.updatedAt))
        );
  
        const ctData = completedComplaints.map(c => calculateCT(c.assignTechnicianTime, c.updatedAt));
        const totalCT = ctData.reduce((sum, tat) => sum + tat, 0);
        const avgCT = ctData.length ? (totalCT / ctData.length).toFixed(2) : 0;
        const ct = avgCT <= 3 ? "100" : avgCT <= 6 ? "80" : avgCT <= 8 ? "60" : avgCT <= 12 ? "40" : avgCT <= 17 ? "30" : avgCT <= 24 ? "10" : "5"
        const rt = avgCT <= 3 ? "100" : avgCT <= 6 ? "80" : avgCT <= 8 ? "60" : avgCT <= 12 ? "40" : avgCT <= 17 ? "30" : avgCT <= 24 ? "10" : "5"
        setAverageClosingTime(ct);
        setAverageResponseTime(rt);
  
        // Calculate TAT percentage
        const tatPercent = completedComplaints1.length ? (avgTAT / targetTAT) * 100 : 0;
        setTatPercentage(tatPercent.toFixed(2));
  
        // Calculate CT percentage
        const ctPercent = completedComplaints?.length ? (avgCT / targetCT) * 100 : 0;
        setCtPercentage(ctPercent.toFixed(2));
  
        // Calculate RT percentage
        const rtPercent = completedComplaints.length ? (avgCT / targetRT) * 100 : 0;
        setRtPercentage(rtPercent.toFixed(2));
  
        setComplaint(data); // Store all fetched complaints
      } catch (err) {
        console.log(err); // Handle errors if any
      }
    };
  
    const notificationCount=10;
    // Filter complaints based on user role for displaying in the list
    const filterData = userData?.role === "ADMIN" ? complaint
      : userData?.role === "BRAND" ? complaint.filter((item) => item?.brandId === userData._id)
        : userData?.role === "USER" ? complaint.filter((item) => item?.userId === userData._id)
          : userData?.role === "SERVICE" ? complaint.filter((item) => item?.assignServiceCenterId === userData._id)
            : userData?.role === "TECHNICIAN" ? complaint.filter((item) => item?.technicianId === userData._id)
              : userData?.role === "DEALER" ? complaint.filter((item) => item?.dealerId === userData._id)
                : complaint;
  
    // Add index to filtered data for rendering purposes
    const data = filterData?.map((item, index) => ({ ...item, i: index + 1 }));
  
    // Function to trigger data refresh
    const RefreshData = (data) => {
      setRefresh(data);
    };

    const pieChartData = [
        { name: "AllComplaints", population: dashData?.complaints?.allComplaints || 0, color: "rgba(131, 167, 234, 1)", legendFontColor: "#7F7F7F", legendFontSize: 15 },
        { name: "Assign", population: dashData?.complaints?.assign || 0, color: "#F00", legendFontColor: "#7F7F7F", legendFontSize: 15 },
        { name: "Pending", population: dashData?.complaints?.pending || 0, color: "yellow", legendFontColor: "#7F7F7F", legendFontSize: 15 },
        { name: "Complete", population: dashData?.complaints?.complete || 0, color: "green", legendFontColor: "#7F7F7F", legendFontSize: 15 },
        { name: "PartPending", population: dashData?.complaints?.partPending || 0, color: "purple", legendFontColor: "#7F7F7F", legendFontSize: 15 },
        { name: "InProgress", population: dashData?.complaints?.inProgress || 0, color: "purple", legendFontColor: "#7F7F7F", legendFontSize: 15 },
    ];

    // Example bar chart data
    const barChartData = [
        { label: "AllComplaints", data: dashData?.complaints?.allComplaints || 0 },
        { label: "Assign", data: dashData?.complaints?.assign || 0 },
        { label: "Pending", data: dashData?.complaints?.pending || 0 },
        { label: "Complete", data: dashData?.complaints?.complete || 0 },
        { label: "PartPending", data: dashData?.complaints?.partPending || 0 },
        { label: "InProgress", data: dashData?.complaints?.inProgress || 0 },
    ];

    return (
        <ScrollView>
            <View style={styles.container}>
                {/* Replace with your React Native components and styling */}
                <View style={styles.headerContent}>
                    <MaterialIcons name="person" size={24} color="black" style={styles.icon} />
                    <Text style={styles.title}>Dashboard</Text>
                    <View style={styles.iconContainer}>
                        <FontAwesome name="bell" size={24} color="black" style={styles.icon} />
                        {notificationCount > 0 && (
                            <View style={styles.notificationBadge}>
                                <Text style={styles.notificationText}>{notificationCount}</Text>
                            </View>
                        )}
                    </View>
                </View>

                <View style={styles.summaryContainer}>
                    <View style={styles.itemContainer}>
                        <TouchableOpacity onPress={() => navigation.navigate("/complaint/create")} style={[styles.button, { backgroundColor: '#FFD700' }]}>
                            {/* <CountUp start={0} end={dashData?.complaints?.allComplaints} /> */}
                            <Text>{dashData?.complaints?.allComplaints}</Text>
                        </TouchableOpacity>
                        <Text>Total Service</Text>
                    </View>
                    <View style={styles.itemContainer}>
                        <TouchableOpacity onPress={() => navigation.navigate("/complaint/create")} style={[styles.button, { backgroundColor: '#FF6347' }]}>
                            {/* <CountUp start={0} end={dashData?.complaints?.complete} /> */}
                            <Text>{dashData?.complaints?.complete}</Text>

                        </TouchableOpacity>
                        <Text>Completed</Text>
                    </View>
                    <View style={styles.itemContainer}>
                        <TouchableOpacity onPress={() => navigation.navigate("/complaint/create")} style={[styles.button, { backgroundColor: '#FF6347' }]}>
                            {/* <CountUp start={0} end={dashData?.complaints?.assign} /> */}
                            <Text>{dashData?.complaints?.assign}</Text>

                        </TouchableOpacity>
                        <Text>Assigned</Text>
                    </View>
                    <View style={styles.itemContainer}>
                        <TouchableOpacity onPress={() => navigation.navigate("/complaint/create")} style={[styles.button, { backgroundColor: '#90EE90' }]}>
                            {/* <CountUp start={0} end={dashData?.complaints?.pending} /> */}
                            <Text>{dashData?.complaints?.pending}</Text>

                        </TouchableOpacity>
                        <Text>Pending</Text>
                    </View>
                    <View style={styles.itemContainer}>
                        <TouchableOpacity onPress={() => navigation.navigate("/complaint/create")} style={[styles.button, { backgroundColor: '#90EE90' }]}>
                            {/* <CountUp start={0} end={dashData?.complaints?.pending} /> */}
                            <Text>{dashData?.complaints?.inProgress}</Text>

                        </TouchableOpacity>
                        <Text>In Progress</Text>
                    </View>
                    <View style={styles.itemContainer}>
                        <TouchableOpacity onPress={() => navigation.navigate("/complaint/create")} style={[styles.button, { backgroundColor: '#FFD700' }]}>
                            {/* <CountUp start={0} end={dashData?.complaints?.zeroToOneDays} /> */}
                            <Text>{dashData?.complaints?.zeroToOneDays}</Text>

                        </TouchableOpacity>
                        <Text>0-1 days service</Text>
                    </View>
                    <View style={styles.itemContainer}>
                        <TouchableOpacity onPress={() => navigation.navigate("/complaint/create")} style={[styles.button, { backgroundColor: '#FFD700' }]}>
                            {/* <CountUp start={0} end={dashData?.complaints?.twoToFiveDays} /> */}
                            <Text>{dashData?.complaints?.twoToFiveDays}</Text>

                        </TouchableOpacity>
                        <Text>2-5 days service</Text>
                    </View>
                    <View style={styles.itemContainer}>
                        <TouchableOpacity onPress={() => navigation.navigate("/complaint/create")} style={[styles.button, { backgroundColor: '#FFD700' }]}>
                            {/* <CountUp start={0} end={dashData?.complaints?.moreThanFiveDays} /> */}
                            <Text>{dashData?.complaints?.moreThanFiveDays}</Text>

                        </TouchableOpacity>
                        <Text>More than Five Days Service</Text>
                    </View>
                    <View style={styles.itemContainer}>
                        <TouchableOpacity onPress={() => navigation.navigate("/complaint/create")} style={[styles.button, { backgroundColor: '#FFD700' }]}>
                            {/* <CountUp start={0} end={dashData?.complaints?.moreThanFiveDays} /> */}
                            <Text>{averageClosingTime}</Text>

                        </TouchableOpacity>
                        <Text>CT</Text>
                    </View>
                    <View style={styles.itemContainer}>
                        <TouchableOpacity onPress={() => navigation.navigate("/complaint/create")} style={[styles.button, { backgroundColor: '#FFD700' }]}>
                            {/* <CountUp start={0} end={dashData?.complaints?.moreThanFiveDays} /> */}
                            <Text>{averageResponseTime}</Text>

                        </TouchableOpacity>
                        <Text>RT</Text>
                    </View>
                    <View style={styles.itemContainer}>
                        <TouchableOpacity onPress={() => navigation.navigate("/complaint/create")} style={[styles.button, { backgroundColor: '#FFD700' }]}>
                            {/* <CountUp start={0} end={dashData?.complaints?.moreThanFiveDays} /> */}
                            <Text>{averageTAT}</Text>

                        </TouchableOpacity>
                        <Text>TAT</Text>
                    </View>
                    <View style={styles.itemContainer}>
                        <TouchableOpacity onPress={() => navigation.navigate("/complaint/create")} style={[styles.button, { backgroundColor: '#FFD700' }]}>
                            {/* <CountUp start={0} end={dashData?.complaints?.moreThanFiveDays} /> */}
                            <Text>{dashData?.complaints?.moreThanFiveDays}</Text>

                        </TouchableOpacity>
                        <Text>Wallet</Text>
                    </View>

                   
                </View>


                <PieChart
                    data={pieChartData}
                    width={330}
                    height={220}
                    chartConfig={{
                        backgroundColor: "#e26a00",
                        backgroundGradientFrom: "#fb8c00",
                        backgroundGradientTo: "#ffa726",
                        color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`, // Color for data slices
                        labelColor: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`, // Color for labels
                        style: {
                            borderRadius: 16,
                        },
                    }}
                    accessor="population"
                    backgroundColor="transparent"
                    paddingLeft="5"
                />
                <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.chartContainer}>
                    <View style={{ width: 400 }}>
                        <BarChart
                            data={{
                                labels: barChartData.map(item => item.label),
                                datasets: [{
                                    data: barChartData.map(item => item.data)
                                }]
                            }}
                            width={350}
                            height={220}
                            yAxisLabel=""
                            chartConfig={{
                                backgroundColor: "#e26a00",
                                backgroundGradientFrom: "#fb8c00",
                                backgroundGradientTo: "#ffa726",
                                decimalPlaces: 0,
                                color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                                labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                                style: {
                                    borderRadius: 16,
                                },
                                propsForLabels: {
                                    fontSize: 7,
                                },
                            }}
                            style={{
                                marginVertical: 8,
                                borderRadius: 16,
                            }}
                        />
                    </View>
                </ScrollView>

                {/* <RecentServicesList data={filterData} userData={userData} /> */}
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
        backgroundColor: '#fff',
        marginTop:25,
        borderRadius:30
    },
    gridContainer: {
        // flexDirection: 'row',
        // justifyContent: 'space-between',

        marginTop: 20,
        marginBottom: 10,
    },
    headerContent: {
        marginTop: 5,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: "space-between"
    },
    title: {
        fontSize: 25,
        fontFamily: 'outfit-medium',
        marginHorizontal: 10,
    },
    icon: {
        marginHorizontal: 10,
        padding: 5,
        backgroundColor: Colors.GRAY,
        borderRadius: 50,
        marginBottom: 10
    },
    iconContainer: {
        position: 'relative',
        paddingHorizontal: 10,
      },
      notificationBadge: {
        position: 'absolute',
        right: 10,
        top: -1,
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
        backgroundColor: '#f0f8ff',
        borderRadius: 10,
        padding: 10,
        marginBottom: 10,
    },
    itemContainer: {
        alignItems: 'center',
        marginBottom: 10,
        width: '45%',
    },
    button: {
        width: 50,
        height: 50,
        borderRadius: 40,
        justifyContent: 'center',
        alignItems: 'center',
    },
    addButton: {
        width: 140,
        height: 50,
        borderRadius: 15,
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 16,
    },
    chartContainer: {
        flexDirection: 'col',
        marginHorizontal: 10,
        marginBottom: 10,
    },
});

export default TechnicianDashboard;
