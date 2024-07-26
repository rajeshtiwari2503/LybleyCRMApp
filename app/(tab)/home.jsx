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
  const [complaints, setComplaint] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [refresh, setRefresh] = useState("");

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
    getAllComplaint();
    getAllNotification()
      }, [refresh ]);
      const getAllNotification = async () => {
        const storedValue = await AsyncStorage.getItem('user');
        const userType = JSON.parse(storedValue);
        try {
    
          const endPoint = (userType?.user?.role) === "ADMIN" ? `/getAllNotification` : (userType?.user?.role) === "USER" ? `/getNotificationByUserId/${userType?.user?._id}`
            : (userType?.user?.role) === "BRAND" ? `/getNotificationByBrandId/${userType?.user?._id}`
              : (userType?.user?.role) === "SERVICE" ? `/getNotificationByServiceCenterId/${userType?.user?._id}`
                : (userType?.user?.role) === "TECHNICIAN" ? `/getNotificationByTechnicianId/${userType?.user?._id}`
                  : (userType?.user?.role) === "DEALER" ? `/getNotificationByDealerId/${userType?.user?._id}`
                    : ""
          let response = await http_request.get(endPoint)
          let { data } = response;
          setNotifications(data)
        }
        catch (err) {
          console.log(err);
        }
      }
    const getAllComplaint = async () => {
        try {
            const storedValue = await AsyncStorage.getItem('user');
              const user = JSON.parse(storedValue);
              
          let response = await http_request.get("/getAllComplaint");  
          let { data } = response;
          const filteredData = user?.user.role === "ADMIN" ? data
          : user?.user.role === "BRAND" ? data.filter((item) => item?.brandId === user?.user?._id)
            : user?.user.role === "USER" ? data.filter((item) => item?.userId === user?.user?._id)
              : user?.user.role === "SERVICE" ? data.filter((item) => item?.assignServiceCenterId ===  user?.user?._id)
                : user?.user.role === "TECHNICIAN" ? data.filter((item) => item?.technicianId ===  user?.user?._id)
                  : user?.user.role === "DEALER" ? data.filter((item) => item?.dealerId ===   user?.user?._id)
                    : []
          setComplaint(filteredData)
        }
        catch(err){
            console.log(err);
        }
    }
 
    const RefreshData=(data)=>{
      setRefresh(data)
    }
  return (
  
      <View style={styles.container}>
    
        {value?.user?.role === "USER" && <UserDashboard dashData={dashData}complaints={complaints} userData={value?.user} notifications={notifications}RefreshData={RefreshData}/>}
        {value?.user?.role === "TECHNICIAN" && <TechnicianDashboard dashData={dashData}complaints={complaints} userData={value?.user}notifications={notifications} RefreshData={RefreshData}/>}
        {value?.user?.role === "DEALER" && <DealerDashboard dashData={dashData} complaints={complaints}userData={value?.user} notifications={notifications}RefreshData={RefreshData}/>}
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
