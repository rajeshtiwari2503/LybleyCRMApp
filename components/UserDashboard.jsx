import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';

import { BarChart, PieChart } from 'react-native-chart-kit';
import { useNavigation } from '@react-navigation/native';
// import RecentServicesList from '../complaint/RecentServices';

const UserDashboard = (props) => {
    const navigation = useNavigation();
    const userData = props?.userData;
    const dashData = props?.dashData;

    const [complaint, setComplaint] = useState([]);




    const filterData = userData?.role === "ADMIN" ? dashData
        : userData?.role === "BRAND" ? complaint.filter((item) => item?.brandId === userData._id)
            : userData?.role === "USER" ? complaint.filter((item) => item?.userId === userData._id)
                : userData?.role === "SERVICE" ? complaint.filter((item) => item?.assignServiceCenterId === userData._id)
                    : userData?.role === "TECHNICIAN" ? complaint.filter((item) => item?.technicianId === userData._id)
                        : userData?.role === "DEALER" ? complaint.filter((item) => item?.dealerId === userData._id)
                            : [];

    const data = filterData?.map((item, index) => ({ ...item, i: index + 1 }));

    const pieChartData = [
        { name: "AllComplaints", population: dashData?.complaints?.allComplaints || 0, color: "rgba(131, 167, 234, 1)", legendFontColor: "#7F7F7F", legendFontSize: 15 },
        { name: "Assign", population: dashData?.complaints?.assign || 0, color: "#F00", legendFontColor: "#7F7F7F", legendFontSize: 15 },
        { name: "Pending", population: dashData?.complaints?.pending || 0, color: "yellow", legendFontColor: "#7F7F7F", legendFontSize: 15 },
        { name: "Complete", population: dashData?.complaints?.complete || 0, color: "green", legendFontColor: "#7F7F7F", legendFontSize: 15 },
        { name: "PartPending", population: dashData?.complaints?.partPending || 0, color: "purple", legendFontColor: "#7F7F7F", legendFontSize: 15 },
    ];

    // Example bar chart data
    const barChartData = [
        { label: "AllComplaints", data: dashData?.complaints?.allComplaints || 0 },
        { label: "Assign", data: dashData?.complaints?.assign || 0 },
        { label: "Pending", data: dashData?.complaints?.pending || 0 },
        { label: "Complete", data: dashData?.complaints?.complete || 0 },
        { label: "PartPending", data: dashData?.complaints?.partPending || 0 },
    ];

    return (
        <ScrollView>
            <View style={styles.container}>
                {/* Replace with your React Native components and styling */}
                <View style={styles.gridContainer}>
                    <View style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                        <Text style={{fontSize:25,fontFamily:"outfit-medium" }}>Dashboard</Text>
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

                    <TouchableOpacity onPress={() => navigation.navigate("/complaint/create")} style={[styles.button, { backgroundColor: '#FFD700' }]}>
                        <Text style={styles.buttonText}>Add Service Request</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => navigation.navigate("/product")} style={[styles.button, { backgroundColor: '#90EE90' }]}>
                        <Text style={styles.buttonText}>Add Product</Text>
                    </TouchableOpacity>
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
    },
    gridContainer: {
        // flexDirection: 'row',
        // justifyContent: 'space-between',
        
        marginTop : 20,
        marginBottom : 10,
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
        width: 80,
        height: 80,
        borderRadius: 40,
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

export default UserDashboard;
