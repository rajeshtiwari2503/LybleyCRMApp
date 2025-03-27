// import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
// import React from 'react';
// import { Colors } from '@/constants/Colors';
// import Modal from 'react-native-modal';
// import { MaterialIcons } from '@expo/vector-icons';

// export default function ServiceDetails({ isVisible, onClose, service }) {

//   // console.log(service);
  
//   return (
//     <Modal isVisible={isVisible} onBackdropPress={onClose}>
//       <View style={styles.modalContent}>
//       <View style={styles.headerContainer}>
//             <Text style={styles.header}>Service Details</Text>
//             <TouchableOpacity onPress={onClose}>
//               <MaterialIcons name="cancel" size={40} color="red" />
//             </TouchableOpacity>
//           </View>
//         <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollViewContent}>
         

//           <View style={styles.section}>
//             <Text style={styles.sectionHeader}>Product Information</Text>
//             <DetailItem label="Product Name" value={service.productName} />
//             <DetailItem label="Category Name" value={service.categoryName} />
//             <DetailItem label="Brand" value={service.productBrand} />
//             <DetailItem label="Model No" value={service.modelNo} />
//             <DetailItem label="Serial No" value={service.serialNo} />
//             <DetailItem label="Purchase Date" value={new Date(service.purchaseDate).toLocaleDateString()} />
//             <DetailItem label="Warranty Status" value={service.warrantyStatus ? 'Yes' : 'No'} />
//             <DetailItem label="Warranty Status" value={service?.payment} />
//           </View>

//           <View style={styles.section}>
//             <Text style={styles.sectionHeader}>Service Information</Text>
//             <DetailItem label="Service ID" value={service._id} />
//             <DetailItem label="Status" value={service.status} />
//             <DetailItem label="Issue Type" value={service.issueType} />
//             <DetailItem label="Detailed Description" value={service.detailedDescription} />
//             {/* <Image source={{ uri: service.issueImages }} style={styles.issueImage} /> */}
//             <DetailItem label="Error Messages" value={service.errorMessages} />
//             <DetailItem label="Preferred Service Date" value={new Date(service.preferredServiceDate).toLocaleDateString()} />
//             <DetailItem label="Preferred Service Time" value={service.preferredServiceTime} />
//             <DetailItem label="Service Location" value={service.serviceLocation} />
//           </View>

//           <View style={styles.section}>
//             <Text style={styles.sectionHeader}>Customer Information</Text>
//             <DetailItem label="Full Name" value={service.fullName} />
//             <DetailItem label="Phone Number" value={service.phoneNumber} />
//             <DetailItem label="Email Address" value={service.emailAddress} />
//             <DetailItem label="Alternate Contact Info" value={service.alternateContactInfo} />
//             <DetailItem label="Service Address" value={service.serviceAddress} />
//           </View>

//           <View style={styles.section}>
//             <Text style={styles.sectionHeader}>Assignment Information</Text>
//             <DetailItem label="Assigned Service Center" value={service.assignServiceCenter} />
//             <DetailItem label="Technician" value={service?.assignTechnician} />
//             <DetailItem label="Technician Contact" value={service?.technicianContact} />
//             <DetailItem label="Comments" value={service.comments} />
//           </View>

//         </ScrollView>
//       </View>
//     </Modal>
//   )
// }

// const DetailItem = ({ label, value }) => (
//   <View style={styles.detailContainer}>
//     <Text style={styles.detailLabel}>{label}:</Text>
//     <Text style={styles.detailValue}>{value}</Text>
//   </View>
// );

// const styles = StyleSheet.create({
//   modalContent: {
//     backgroundColor: 'white',
//     borderRadius: 10,
//     padding: 20,
//     justifyContent: 'center',
//     height: '90%',
//   },
//   scrollView: {
//     flex: 1,
//   },
//   scrollViewContent: {
//     paddingBottom: 20,
//   },
//   headerContainer: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     marginBottom: 20,
//   },
//   header: {
//     fontSize: 22,
//     fontWeight: 'bold',
//     color: Colors.PRIMARY,
//   },
//   section: {
//     marginBottom: 20,
//   },
//   sectionHeader: {
//     fontSize: 18,
//     fontWeight: 'bold',
//     marginBottom: 10,
//     color: Colors.PRIMARY,
//   },
//   detailContainer: {
//     flexDirection: 'row',
//     marginBottom: 8,
//   },
//   detailLabel: {
//     fontWeight: 'bold',
//     flex: 2,
//     color: '#333',
//   },
//   detailValue: {
//     flex: 2,
//     color: '#666',
//   },
//   issueImage: {
//     width: '100%',
//     height: 200,
//     borderRadius: 10,
//     marginVertical: 10,
//   },
//   closeButton: {
//     backgroundColor: '#f44336',
//     paddingVertical: 12,
//     borderRadius: 15,
//     alignItems: 'center',
//     marginTop: 20,
//   },
//   closeButtonText: {
//     color: '#fff',
//     fontSize: 16,
//   },
// });

import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import Modal from 'react-native-modal';
import { MaterialIcons } from '@expo/vector-icons';

const ServiceDetails = ({ isVisible, onClose, complaint, onAccept, onReject, onUpdateStatus }) => {
  if (!complaint) {
    return null;
  }
  const Section = ({ title, children }) => (
    <View style={{ marginBottom: 15 }}>
      <Text style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 5 }}>{title}</Text>
      <View style={{ paddingLeft: 10 }}>{children}</View>
    </View>
  );
  const DetailItem = ({ label, value }) => (
    <View style={styles.detailContainer}>
      <Text style={styles.detailLabel}>{label}:</Text>
      <Text style={styles.detailValue}>
        {typeof value === 'object' ? JSON.stringify(value, null, 2) : value || 'N/A'}
      </Text>
    </View>
  );
  return (
    <Modal isVisible={isVisible} onBackdropPress={onClose}>
      <View style={styles.modalContent}>
        <View style={styles.headerContainer}>
          <Text style={styles.header}>Service Details</Text>
          <TouchableOpacity onPress={onClose}>
            <MaterialIcons name="cancel" size={30} color="red" />
          </TouchableOpacity>
        </View>
        <ScrollView>
          <Section title="Product Information">
            <DetailItem label="CreatedAT" value={ new Date(complaint.createdAt).toLocaleString()} />
            
            <DetailItem label="Product Name" value={complaint.productName} />
            <DetailItem label="Category" value={complaint.categoryName} />
            <DetailItem label="Brand" value={complaint.productBrand} />
            <DetailItem label="Model Number" value={complaint.modelNo} />
            <DetailItem label="Serial Number" value={complaint.serialNo} />
            <DetailItem label="Purchase Date" value={new Date(complaint.purchaseDate).toLocaleString()} />
            <DetailItem label="Warranty Status" value={complaint.warrantyStatus} />
          </Section>
          <Section title="Service Information">
            <DetailItem label="Issue Type" value={complaint.issueType} />
            <DetailItem label="Detailed Description" value={complaint.detailedDescription} />
            <DetailItem label="Error Messages" value={complaint.errorMessages} />
            <DetailItem label="Preferred Service Date" value={new Date(complaint.preferredServiceDate).toLocaleString()} />
            <DetailItem label="Preferred Service Time" value={complaint.preferredServiceTime} />
            <DetailItem label="Service Location" value={complaint.serviceLocation} />
          </Section>
          <Section title="Customer Information">
            <DetailItem label="Full Name" value={complaint.fullName} />
            <DetailItem label="Phone Number" value={complaint.phoneNumber} />
            <DetailItem label="Email Address" value={complaint.emailAddress} />
            <DetailItem label="Alternate Contact Info" value={complaint.alternateContactInfo} />
            <DetailItem label="Service Address" value={complaint.serviceAddress} />
          </Section>
          <Section title="Payment Information">
            {/* <DetailItem label="Payment Brand" value={complaint.paymentBrand} /> */}
            <DetailItem label="Payment Service Center" value={complaint.paymentServiceCenter} />
          </Section>
          <Section title="Assignment Information">
            <DetailItem label="Assigned Service Center" value={complaint.assignServiceCenter} />
            <DetailItem label="Assigned Time " value= {new Date(complaint.assignServiceCenterTime).toLocaleString()} />
            {/* <DetailItem label="Response Time " value= {new Date(complaint.serviceCenterResponseTime).toLocaleString()} /> */}
          </Section>
          {/* <Section title="Update History">
            {complaint.updateHistory && complaint.updateHistory.length > 0 ? (
              complaint.updateHistory.map((history) => (
                <View key={history._id} style={styles.commentContainer}>
                  <Text style={styles.commentDate}>
                    <Text style={styles.boldText}>Updated At:</Text> {new Date(history.updatedAt).toLocaleString()}
                  </Text>
                  {Object.entries(history.changes).map(([key, value]) =>
                    key !== "serviceCenterContact" ? (
                      <Text key={key} style={styles.commentText}>
                        <Text style={styles.boldText}>{key.replace(/\b\w/, (char) => char.toUpperCase())}:</Text> {typeof value === 'object' ? JSON.stringify(value, null, 2) : value}
                      </Text>
                    ) : null
                  )}
                </View>
              ))
            ) : (
              <Text>No updates available.</Text>
            )}
          </Section>
          <Section title="Updated Comments">
            {complaint.updateComments && complaint.updateComments.length > 0 ? (
              complaint.updateComments.map((comment) => (
                <View key={comment._id} style={styles.commentContainer}>
                  <Text style={styles.commentDate}><Text style={styles.boldText}>Updated At:</Text> {new Date(comment.updatedAt).toLocaleString()}</Text>
                  {Object.entries(comment.changes).map(([key, value]) => (
                    <Text key={key} style={styles.commentText}>
                      <Text style={styles.boldText}>{key.replace(/\b\w/, (char) => char.toUpperCase())}:</Text> {typeof value === 'object' ? JSON.stringify(value, null, 2) : value}
                    </Text>
                  ))}
                </View>
              ))
            ) : (
              <Text>No comments available.</Text>
            )}
          </Section> */}
        </ScrollView>
       
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContent: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    height: '80%',
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  button: {
    flex: 1,
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginHorizontal: 5,
  },
  acceptButton: {
    backgroundColor: 'green',
  },
  rejectButton: {
    backgroundColor: 'red',
  },
  updateButton: {
    backgroundColor: 'blue',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  sectionContainer: {
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  sectionContent: {
    paddingLeft: 10,
  },
  detailContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  detailLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    marginRight: 5,
  },
  detailValue: {
    fontSize: 16,
    color: 'gray',
  },
});

export default ServiceDetails;
