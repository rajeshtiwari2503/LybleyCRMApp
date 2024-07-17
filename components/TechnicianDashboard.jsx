import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
// Import necessary components for React Native charts and animations
// import RecentServicesList from '../complaint/RecentServices'; // Assuming this component displays recent services

const TechnicianDashboard = (props) => {
  const { userData, dashData } = props; // Destructure props to get user data and dashboard data

  const [complaint, setComplaint] = useState([]); // State to hold complaint data

  // Replace with actual calculations for average TAT, CT, RT
  const averageTAT = 12;
  const averageCT = 6;
  const averageRT = 3;

  // Simulated data for charts (replace with actual data)
  const pieChartData = [
    { task: 'All Complaints', hoursPerDay: dashData?.complaints?.allComplaints },
    { task: 'Assign', hoursPerDay: dashData?.complaints?.assign },
    // Add other data points as needed
  ];

  const barChartData = [
    { complaintStatus: 'All Complaints', count: dashData?.complaints?.allComplaints },
    { complaintStatus: 'Assign', count: dashData?.complaints?.assign },
    // Add other data points as needed
  ];

  // Simulated data for recent services (replace with actual data)
  const recentServicesData = dashData?.recentServices || [];

  // Fetch data when component mounts
  useEffect(() => {
    getAllComplaint();
  }, []);

  // Simulated function to fetch complaints (replace with actual fetch logic)
  const getAllComplaint = async () => {
    try {
      // Simulated response data (replace with actual API call)
      const response = await fetch('/getAllComplaint');
      const data = await response.json();
      setComplaint(data);
    } catch (error) {
      console.error('Error fetching complaints:', error);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Display summary statistics */}
      <View style={styles.summaryContainer}>
        {/* Example: Display total complaints */}
        <View style={styles.statBox}>
          <View style={[styles.countBox, { backgroundColor: '#F59E0B' }]}>
            <Text style={styles.countText}>{dashData?.complaints?.allComplaints}</Text>
          </View>
          <Text style={styles.statLabel}>Total Service</Text>
        </View>
        {/* Add other statistics boxes for completed, assigned, in progress, etc. */}
      </View>

      {/* Display charts */}
      <View style={styles.chartContainer}>
        {/* Example: Pie Chart */}
        {/* Replace with appropriate React Native chart component */}
        <Text style={styles.chartTitle}>Complaints Summary</Text>
        {/* Example: Bar Chart */}
        {/* Replace with appropriate React Native chart component */}
      </View>

      {/* Display recent services list */}
      <View style={styles.recentServicesContainer}>
        {/* <RecentServicesList data={recentServicesData} /> */}
      </View>

      {/* Add other components or sections as needed */}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  summaryContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  statBox: {
    width: '45%',
    marginBottom: 16,
  },
  countBox: {
    borderRadius: 8,
    padding: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  countText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
  },
  statLabel: {
    textAlign: 'center',
    marginTop: 8,
  },
  chartContainer: {
    marginBottom: 16,
  },
  chartTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  recentServicesContainer: {
    marginBottom: 16,
  },
});

export default TechnicianDashboard;
