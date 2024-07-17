import React, { useEffect, useState } from 'react';
import { View,   StyleSheet } from 'react-native';
 
import { useNavigation } from '@react-navigation/native'; // Assuming you use React Navigation for navigation
import http_request from "../../http_request"; // Assuming this is your HTTP request module
import UserDashboard from '../../components/UserDashboard';
import TechnicianDashboard from '../../components/TechnicianDashboard';
import DealerDashboard from '../../components/DealerDashboard';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Dashboard = () => {
  const navigation = useNavigation();
  const [value, setValue] = useState(null);
  const [dashData, setDashData] = useState(null);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const storedValue = await AsyncStorage.getItem('user');
        if (storedValue) {
          const user = JSON.parse(storedValue);
          setValue(user);

          let endPoint = '';
          switch (user?.user?.role) {
            
            case "DEALER":
              endPoint = `/dashboardDetailsByDealerId/${user?.user?._id}`;
              break;
            
            case "USER":
              endPoint = `/dashboardDetailsByUserId/${user?.user?._id}`;
              break;
            case "TECHNICIAN":
              endPoint = `/dashboardDetailsByTechnicianId/${user?.user?._id}`;
              break;
            
            default:
              break;
          }

          if (endPoint) {
            const response = await http_request.get(endPoint);
            const { data } = response;
            // console.log(data);
            setDashData(data);
          }
        }
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      }
    };

    fetchDashboardData();
  }, []);

  return (
  
      <View style={styles.container}>
    
        {value?.user?.role === "USER" && <UserDashboard dashData={dashData} userData={value?.user} />}
        {value?.user?.role === "TECHNICIAN" && <TechnicianDashboard dashData={dashData} userData={value?.user} />}
        {value?.user?.role === "DEALER" && <DealerDashboard dashData={dashData} userData={value?.user} />}
      </View>
  
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
    paddingBottom:10,
    paddingTop:10
    // padding: 10,
  },
});

export default Dashboard;
